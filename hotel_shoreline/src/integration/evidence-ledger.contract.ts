import { expect } from "vitest";
import type { ComparisonEvidenceRecord } from "../lib/evidence-ledger/records";
import type { EvidenceLedgerRepository } from "../lib/evidence-ledger/repository";
import { EvidenceLedgerError } from "../lib/evidence-ledger/repository";

export async function verifyEvidenceLedgerContract(input: {
	readonly createRepository: () => Promise<EvidenceLedgerRepository>;
	readonly records: readonly [ComparisonEvidenceRecord, ComparisonEvidenceRecord];
}) {
	const repository = await input.createRepository();
	const [older, newer] = input.records;

	await expect(repository.append(older)).resolves.toEqual({ outcome: "inserted" });
	await expect(repository.append(older)).resolves.toEqual({ outcome: "replayed" });
	const concurrentReplay = await Promise.all([repository.append(newer), repository.append(newer)]);
	expect(concurrentReplay.map(({ outcome }) => outcome).sort()).toEqual(["inserted", "replayed"]);
	await expect(repository.get(older.comparisonId)).resolves.toEqual(older);
	await expect(repository.get("missing-comparison")).resolves.toBeUndefined();
	await expect(repository.list({ limit: 1 })).resolves.toEqual([newer]);
	await expect(repository.list({ limit: 0 })).rejects.toMatchObject({
		code: "INVALID_LEDGER_QUERY",
	});

	const conflicting = { ...older, contentHash: newer.contentHash };
	await expect(repository.append(conflicting)).rejects.toBeInstanceOf(EvidenceLedgerError);
	await expect(repository.append(conflicting)).rejects.toMatchObject({ code: "LEDGER_CONFLICT" });

	const returned = await repository.get(older.comparisonId);
	if (returned) {
		expect(Object.isFrozen(returned)).toBe(true);
		expect(() => {
			(returned as { recordedAt: string }).recordedAt = "mutated";
		}).toThrow(TypeError);
	}
	await expect(repository.get(older.comparisonId)).resolves.toEqual(older);
	await repository.close();
}
