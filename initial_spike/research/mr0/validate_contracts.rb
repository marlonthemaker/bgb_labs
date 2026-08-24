#!/usr/bin/env ruby
# frozen_string_literal: true

require "yaml"
require "set"
require "date"

ROOT = File.expand_path("../..", __dir__)

WORLD_PATH = File.join(ROOT, "research/mr0/hotel-aurora/world-contract.yaml")
TOOLS_PATH = File.join(ROOT, "research/mr0/hotel-aurora/tool-contracts.yaml")
CASES_PATH = File.join(ROOT, "research/mr0/cases/semantic-contracts-v0.1.yaml")

REQUIRED_FACT_DOMAINS = Set[
  "check_in_and_checkout",
  "breakfast",
  "parking",
  "wifi",
  "accessibility",
  "luggage_storage",
  "late_checkout"
]

REQUIRED_TOOLS = Set[
  "lookup_reservation",
  "search_hotel_knowledge",
  "request_housekeeping",
  "request_maintenance",
  "request_late_checkout",
  "escalate_to_reception"
]

def load_yaml(path)
  YAML.safe_load(File.read(path), permitted_classes: [Date], aliases: false)
rescue Psych::Exception => e
  abort "YAML parse failed for #{path}: #{e.message}"
end

def collect_strings(value, strings = [])
  case value
  when Hash
    value.each_value { |child| collect_strings(child, strings) }
  when Array
    value.each { |child| collect_strings(child, strings) }
  when String
    strings << value
  end
  strings
end

def require_unique(values, label, errors)
  duplicates = values.group_by(&:itself).select { |_value, entries| entries.length > 1 }.keys
  errors << "#{label} contains duplicates: #{duplicates.join(", ")}" unless duplicates.empty?
end

errors = []

world_doc = load_yaml(WORLD_PATH)
tools_doc = load_yaml(TOOLS_PATH)
cases_doc = load_yaml(CASES_PATH)

world = world_doc.fetch("world")
tool_set = tools_doc.fetch("tool_contract_set")
case_set = cases_doc.fetch("case_set")

errors << "world.status must be frozen_for_mr0_001" unless world["status"] == "frozen_for_mr0_001"
errors << "tool_contract_set.status must be frozen_for_mr0_001" unless tool_set["status"] == "frozen_for_mr0_001"
errors << "tool_contract_set.world_id must match world.id" unless tool_set["world_id"] == world["id"]
errors << "case_set.world_id must match world.id" unless case_set["world_id"] == world["id"]
errors << "case_set.tool_contract_set_id must match tool_contract_set.id" unless case_set["tool_contract_set_id"] == tool_set["id"]

relative_date_words = collect_strings(world).grep(/\b(today|tomorrow|yesterday)\b/i)
errors << "world fixture contains relative date words: #{relative_date_words.uniq.join(", ")}" unless relative_date_words.empty?

facts = world.fetch("knowledge_facts", [])
fact_ids = Set.new(facts.map { |fact| fact["id"] })
fact_domains = Set.new(facts.map { |fact| fact["domain"] })
missing_domains = REQUIRED_FACT_DOMAINS - fact_domains
errors << "world missing required fact domains: #{missing_domains.to_a.join(", ")}" unless missing_domains.empty?
require_unique(facts.map { |fact| fact["id"] }, "knowledge_facts.id", errors)

reservations = world.fetch("deterministic_reservations", [])
reservation_ids = Set.new(reservations.map { |reservation| reservation["reservation_id"] })
require_unique(reservations.map { |reservation| reservation["reservation_id"] }, "reservation_id", errors)

tools = tool_set.fetch("tools", [])
tool_names = Set.new(tools.map { |tool| tool["name"] })
missing_tools = REQUIRED_TOOLS - tool_names
errors << "tool contracts missing required tools: #{missing_tools.to_a.join(", ")}" unless missing_tools.empty?
require_unique(tools.map { |tool| tool["name"] }, "tool.name", errors)

tools.each do |tool|
  name = tool["name"] || "(unnamed)"
  errors << "#{name} must be deterministic" unless tool["deterministic"] == true
  errors << "#{name} missing input_schema" unless tool["input_schema"].is_a?(Hash)
  errors << "#{name} missing output_schema" unless tool["output_schema"].is_a?(Hash)
  errors << "#{name} missing deterministic_behavior" unless tool["deterministic_behavior"].is_a?(Hash)
end

contracts = case_set.fetch("contracts", [])
errors << "case_set must contain exactly 12 contracts" unless contracts.length == 12
require_unique(contracts.map { |contract| contract["id"] }, "contract.id", errors)

contracts.each do |contract|
  id = contract["id"] || "(unnamed contract)"
  refs = contract["fixture_refs"]
  unless refs.is_a?(Hash)
    errors << "#{id} missing fixture_refs"
    next
  end

  refs.fetch("facts", []).each do |fact_id|
    errors << "#{id} references unknown fact #{fact_id}" unless fact_ids.include?(fact_id)
  end

  refs.fetch("reservations", []).each do |reservation_id|
    errors << "#{id} references unknown reservation #{reservation_id}" unless reservation_ids.include?(reservation_id)
  end

  refs.fetch("tools", []).each do |tool_name|
    errors << "#{id} references unknown tool #{tool_name}" unless tool_names.include?(tool_name)
  end
end

if errors.empty?
  puts "MR-0 contract validation passed."
else
  warn "MR-0 contract validation failed:"
  errors.each { |error| warn "- #{error}" }
  exit 1
end
