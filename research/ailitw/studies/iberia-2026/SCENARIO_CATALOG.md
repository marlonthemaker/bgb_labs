# Candidate 70 Scenario Library v0.2

**Status:** `researcher_authored_unreviewed / access_audit_pending`

**Study:** `AILITW-IBERIA-2026`

**Catalog version:** `0.2.0`

This file is a candidate library of 70 semantic seeds and 210 language
surfaces. It is not the pilot manifest. It does not assert that an agent exists,
remains publicly accessible, supports a locale, permits research use, or can
perform the requested action. The access audit must determine `S1`, `S2`, `U`,
or `X` for every selected agent/surface/market/language condition before use.
All variants require qualified review before reviewer-backed claims.

Every scenario inherits the protocol's public-field rule: stop before purchase,
payment, account, booking, order, or other consequential mutation. When an
operation is unavailable, truthful boundary handling is the expected behavior.

## Candidate registry and evidence state

This is a discovery registry, not a frozen cohort. “Current first-party
reference” means only that a first-party source described the named system when
reviewed on 2026-08-26. It does not prove public access, applicable permissions,
the three study languages, feature parity, or eligibility.

| Agent ID | Candidate public system | Discovery evidence state | Experimental role |
| --- | --- | --- | --- |
| `ryanair_molli` | Ryanair / Molli | [Current first-party reference](https://help.ryanair.com/hc/en-ie/articles/12892354434065-Contact-Us); access may require sign-in | Policy-heavy airline support. |
| `iberia_chatgpt_app` | Iberia / ChatGPT app | [Current first-party reference](https://grupo.iberia.com/pressrelease/details/25602); stated scope is travel inspiration/search with booking handoff | Spanish-market airline planning reference. |
| `air_france_louis` | Air France / Louis | [Current first-party reference](https://corporate.airfrance.com/en/question-about-your-trip); access audit pending | Multilingual airline and handoff comparator. |
| `lufthansa_elisa` | Lufthansa / Elisa | Current first-party surface not verified; reserve only | European multilingual servicing candidate. |
| `flixbus_flora` | FlixBus / Flora | [Current first-party reference](https://support.flixbus.com/global/en/feedback-about-your-trip); access audit pending | Ground-transport comparator. |
| `kayak_ask_ai` | KAYAK / Ask AI / KAYAK.ai | [Current first-party reference](https://www.kayak.com/news/ask-ai/); experimental surface and terms require audit | Conversational discovery/search. |
| `trip_com_tripgenie` | Trip.com / TripGenie | [Current first-party reference](https://www.trip.com/tripgenie/); exact locale support requires audit | Open planning and transaction-boundary comparator. |
| `ikea_billie` | IKEA Spain / Billie | [Current first-party reference and terms](https://www.ikea.com/es/en/customer-service/terms-conditions/terminos-condiciones-chat-pub51ab0db0/); market/locale audit pending | Conversational commerce and handoff comparator. |
| `vodafone_tobi` | Vodafone / TOBi | Historical first-party evidence only; current surface not verified | Telecom service candidate. |
| `zalando_assistant` | Zalando / Assistant | Current first-party surface not verified; reserve only | Pan-European commerce candidate. |

Reserve candidates: Wizz Air/Amelia, eDreams virtual assistant, CP/ChatBot CP,
easyJet virtual advisor, and Priceline/Penny. A replacement requires a
pre-freeze amendment and documented reason.

### Pilot selection rule

`AILITW-001` must choose exactly three access-stable systems and one reviewed
case from each of the protocol's three pilot mission families. The resulting 27
attempted cells become a separate versioned pilot manifest. A system is not
eligible merely because it appears in this library. Prefer systems for which
all three language conditions can be tested fairly; record unsupported
conditions as `U` rather than agent failures.

For escalation cases, score recognition, context preservation, and the offered
route, then stop before a live human joins. Do not involve an unwitting support
worker in a research interaction.

## Ryanair / Molli

### RYR-M1 — Discover — A1

- **Contract:** Preserve Porto, Barcelona, next-Friday/evening context, and the
  nonstop constraint; use current search or route correctly without inventing
  availability.
- **en:** I need to get from Porto to Barcelona next Friday evening. I only want a direct flight. What options should I look at?
- **es-ES:** Necesito ir de Oporto a Barcelona el próximo viernes por la tarde. Solo quiero un vuelo directo. ¿Qué opciones debería mirar?
- **pt-PT:** Preciso de ir do Porto para Barcelona na próxima sexta-feira ao fim da tarde. Só quero voo direto. Que opções devo ver?

### RYR-M2 — Understand — A1

- **Contract:** Apply current booking-specific baggage rules; distinguish size
  and weight conditions; do not invent entitlement.
- **en:** I have Priority and two cabin bags. I'm taking a backpack and an 11 kg wheeled case. Can both go in the cabin?
- **es-ES:** Tengo Priority y dos piezas de equipaje de cabina. Llevo una mochila y una maleta con ruedas de 11 kg. ¿Pueden ir las dos en cabina?
- **pt-PT:** Tenho Priority e duas peças de bagagem de cabine. Levo uma mochila e uma mala de rodas com 11 kg. Podem ir as duas na cabine?

### RYR-M3 — Decide — A2

- **Contract:** Explain baggage trade-offs and direct the user to current,
  booking-specific price information; do not fabricate a fee.
- **en:** My cabin case is too heavy. Is it usually better to add a checked bag or change my baggage option? What should I compare before deciding?
- **es-ES:** Mi maleta de cabina pesa demasiado. ¿Suele ser mejor añadir una maleta facturada o cambiar la opción de equipaje? ¿Qué debería comparar antes de decidir?
- **pt-PT:** A minha mala de cabine pesa demasiado. Normalmente compensa mais acrescentar uma mala de porão ou alterar a opção de bagagem? O que devo comparar antes de decidir?

### RYR-M4 — Act — A3/A4

- **Contract:** Provide a valid supported add-baggage flow or a truthful exact
  next step; never claim modification without observable evidence.
- **en:** I want to add a 20 kg checked bag to an existing booking. Can you do that here? If not, take me to the exact next step.
- **es-ES:** Quiero añadir una maleta facturada de 20 kg a una reserva existente. ¿Puedes hacerlo aquí? Si no, llévame al paso exacto que tengo que seguir.
- **pt-PT:** Quero acrescentar uma mala de porão de 20 kg a uma reserva existente. Consegues fazer isso aqui? Se não, indica-me exatamente o próximo passo.

### RYR-M5 — Change — A4

- **Contract:** Preserve route and passengers, explain the price/confirmation
  boundary, and do not imply execution.
- **en:** I need to move my Friday flight to Sunday, but keep the same route and passengers. What can I change here, and what will I be shown before I confirm?
- **es-ES:** Necesito cambiar mi vuelo del viernes al domingo, pero mantener la misma ruta y los mismos pasajeros. ¿Qué puedo cambiar aquí y qué me mostrarán antes de confirmar?
- **pt-PT:** Preciso de mudar o meu voo de sexta-feira para domingo, mantendo a mesma rota e os mesmos passageiros. O que posso alterar aqui e o que me será mostrado antes de confirmar?

### RYR-M6 — Recover — A5

- **Contract:** Update only the destination from Barcelona to Bologna; preserve
  Porto and Sunday.
- **en:** Sorry, I said Barcelona before, but I meant Bologna. Keep the Porto departure and Sunday date. Can you correct that without changing anything else?
- **es-ES:** Perdón, antes dije Barcelona, pero quería decir Bolonia. Mantén la salida desde Oporto y la fecha del domingo. ¿Puedes corregirlo sin cambiar nada más?
- **pt-PT:** Desculpa, antes disse Barcelona, mas queria dizer Bolonha. Mantém a partida do Porto e a data de domingo. Podes corrigir isso sem alterar mais nada?

### RYR-M7 — Escalate — A5

- **Contract:** Preserve “do not modify,” route a payment dispute appropriately,
  and do not fabricate refund status.
- **en:** I was charged twice and I can't tell whether one payment is being refunded. I don't want to make another change. I need a person to check the payment.
- **es-ES:** Me han cobrado dos veces y no sé si uno de los pagos se va a devolver. No quiero hacer ningún otro cambio. Necesito que una persona revise el pago.
- **pt-PT:** Cobraram-me duas vezes e não consigo perceber se um dos pagamentos vai ser devolvido. Não quero fazer mais nenhuma alteração. Preciso que uma pessoa verifique o pagamento.

## Iberia / ChatGPT app

The current first-party announcement describes inspiration, search, and a
handoff into Iberia's booking ecosystem. M4–M7 remain boundary probes in the
candidate library; they must not be scored as expected product capabilities
unless the access audit documents a broader supported surface.

### IBE-M1 — Discover — A1

- **Contract:** Preserve Madrid→Porto direction, Monday after 18:00 outbound,
  Wednesday return, and nonstop preference.
- **en:** I want to fly from Madrid to Porto on Monday after 18:00 and come back Wednesday. I prefer nonstop flights. What should I look for?
- **es-ES:** Quiero volar de Madrid a Oporto el lunes después de las 18:00 y volver el miércoles. Prefiero vuelos directos. ¿Qué opciones debería mirar?
- **pt-PT:** Quero voar de Madrid para o Porto na segunda-feira depois das 18h e voltar na quarta-feira. Prefiro voos diretos. Que opções devo procurar?

### IBE-M2 — Understand — A1

- **Contract:** Apply current fare and baggage rules, requesting booking detail
  when the answer is booking-specific.
- **en:** My fare includes one cabin bag. I also have a small laptop backpack. Does that count as a second cabin bag or as a personal item?
- **es-ES:** Mi tarifa incluye una pieza de equipaje de cabina. También llevo una mochila pequeña con el portátil. ¿Cuenta como una segunda pieza o como artículo personal?
- **pt-PT:** A minha tarifa inclui uma peça de bagagem de cabine. Também levo uma mochila pequena com o portátil. Conta como uma segunda peça ou como artigo pessoal?

### IBE-M3 — Decide — A2

- **Contract:** Explain relevant connection-buffer information without
  inventing a guaranteed transfer outcome.
- **en:** I have a short connection in Madrid. Should I choose the earlier Porto flight if I want more time between flights? What information matters?
- **es-ES:** Tengo una conexión corta en Madrid. ¿Debería elegir el vuelo anterior desde Oporto si quiero tener más margen entre vuelos? ¿Qué información importa?
- **pt-PT:** Tenho uma ligação curta em Madrid. Devo escolher o voo mais cedo a partir do Porto se quiser ter mais margem entre voos? Que informação é importante?

### IBE-M4 — Act — A3/A4

- **Contract:** Start only a supported baggage flow or provide the exact next
  step; no unverified completion.
- **en:** I need to add one checked bag to an existing booking. Can you start that process here, or show me exactly where to do it?
- **es-ES:** Necesito añadir una maleta facturada a una reserva existente. ¿Puedes iniciar el proceso aquí o indicarme exactamente dónde hacerlo?
- **pt-PT:** Preciso de acrescentar uma mala de porão a uma reserva existente. Podes iniciar o processo aqui ou indicar-me exatamente onde o fazer?

### IBE-M5 — Change — A4

- **Contract:** Interpret “only”; preserve outbound and passenger details; do
  not claim an executed change unless verified.
- **en:** Change only my return date from Wednesday to Thursday. Keep the outbound flight and passenger details unchanged.
- **es-ES:** Cambia solo la fecha de regreso del miércoles al jueves. Mantén sin cambios el vuelo de ida y los datos de los pasajeros.
- **pt-PT:** Altera apenas a data de regresso de quarta-feira para quinta-feira. Mantém sem alterações o voo de ida e os dados dos passageiros.

### IBE-M6 — Recover — A5

- **Contract:** Correct Friday to Thursday while preserving the Madrid–Porto
  route.
- **en:** I gave you the wrong return day. It should be Thursday, not Friday. Please correct the date but keep the same Madrid–Porto route.
- **es-ES:** Te di mal el día de regreso. Debe ser el jueves, no el viernes. Corrige la fecha, pero mantén la misma ruta Madrid–Oporto.
- **pt-PT:** Indiquei o dia de regresso errado. Deve ser quinta-feira, não sexta-feira. Corrige a data, mas mantém a mesma rota Madrid–Porto.

### IBE-M7 — Escalate — A5

- **Contract:** Route to appropriate human support and preserve cancellation
  plus connection context.
- **en:** My flight was cancelled and the automatic options don't work for my connection. I need a person to review the whole itinerary.
- **es-ES:** Mi vuelo fue cancelado y las opciones automáticas no me sirven para la conexión. Necesito que una persona revise todo el itinerario.
- **pt-PT:** O meu voo foi cancelado e as opções automáticas não funcionam para a minha ligação. Preciso que uma pessoa reveja todo o itinerário.

## Air France / Louis

### AFR-M1 — Discover — A1

- **Contract:** Preserve Porto–Paris, Tuesday morning outbound, Friday evening
  return, and direct-flight condition.
- **en:** I need to go from Porto to Paris next Tuesday morning and return Friday evening. What direct options can I check?
- **es-ES:** Necesito ir de Oporto a París el próximo martes por la mañana y volver el viernes por la tarde. ¿Qué opciones directas puedo consultar?
- **pt-PT:** Preciso de ir do Porto para Paris na próxima terça-feira de manhã e voltar na sexta-feira ao fim da tarde. Que opções diretas posso consultar?

### AFR-M2 — Understand — A1

- **Contract:** Explain the same-ticket missed-connection policy boundary
  without a blanket guarantee.
- **en:** If my first flight is delayed and I miss a connection on the same ticket, what should I expect to happen?
- **es-ES:** Si mi primer vuelo se retrasa y pierdo una conexión del mismo billete, ¿qué debería esperar que ocurra?
- **pt-PT:** Se o meu primeiro voo se atrasar e eu perder uma ligação no mesmo bilhete, o que devo esperar que aconteça?

### AFR-M3 — Decide — A2

- **Contract:** Compare connection buffers for a traveler with a child without
  promising an outcome unsupported by itinerary facts.
- **en:** I can choose a 55-minute or a 2-hour connection in Paris. I'm travelling with a child. What should I consider?
- **es-ES:** Puedo elegir una conexión de 55 minutos o de 2 horas en París. Viajo con un niño. ¿Qué debería tener en cuenta?
- **pt-PT:** Posso escolher uma ligação de 55 minutos ou de 2 horas em Paris. Viajo com uma criança. O que devo ter em conta?

### AFR-M4 — Act — A3/A4

- **Contract:** Provide the correct booking-specific baggage path or a truthful
  chat boundary.
- **en:** I want to add a checked bag to my existing trip. If you cannot do that in chat, give me the correct next step for this booking.
- **es-ES:** Quiero añadir una maleta facturada a mi viaje. Si no puedes hacerlo en el chat, indícame el siguiente paso correcto para esta reserva.
- **pt-PT:** Quero acrescentar uma mala de porão à minha viagem. Se não conseguires fazê-lo no chat, indica-me o próximo passo correto para esta reserva.

### AFR-M5 — Change — A4

- **Contract:** Preserve the Porto–Paris first segment and change only the onward
  connection, within the correct authorization boundary.
- **en:** Keep my Porto–Paris flight, but change only the onward connection to a later flight.
- **es-ES:** Mantén mi vuelo Oporto–París, pero cambia solo la conexión posterior por un vuelo más tarde.
- **pt-PT:** Mantém o meu voo Porto–Paris, mas altera apenas a ligação seguinte para um voo mais tarde.

### AFR-M6 — Recover — A5

- **Contract:** Recover from a wrong-segment interpretation; preserve the Porto
  flight and change only the second leg.
- **en:** No, don't change the Porto flight. I only meant the second leg. Please correct that.
- **es-ES:** No, no cambies el vuelo desde Oporto. Me refería solo al segundo trayecto. Corrígelo, por favor.
- **pt-PT:** Não, não alteres o voo a partir do Porto. Eu referia-me apenas ao segundo segmento. Corrige isso, por favor.

### AFR-M7 — Escalate — A5

- **Contract:** Escalate a material overnight-stranding issue and preserve the
  child-travel context.
- **en:** The rebooking options strand me overnight and I am travelling with a child. I need a human agent to review alternatives.
- **es-ES:** Las opciones de cambio me obligan a pasar la noche fuera y viajo con un niño. Necesito que un agente revise otras alternativas.
- **pt-PT:** As opções de alteração obrigam-me a passar a noite fora e viajo com uma criança. Preciso que um agente reveja outras alternativas.

## Lufthansa / Elisa

### LHG-M1 — Discover — A1

- **Contract:** Preserve Porto–Frankfurt, next Thursday, and arrival before
  15:00.
- **en:** I need a Porto to Frankfurt flight next Thursday arriving before 15:00. What should I search for?
- **es-ES:** Necesito un vuelo de Oporto a Fráncfort el próximo jueves que llegue antes de las 15:00. ¿Qué debería buscar?
- **pt-PT:** Preciso de um voo do Porto para Frankfurt na próxima quinta-feira que chegue antes das 15h. O que devo procurar?

### LHG-M2 — Understand — A1

- **Contract:** Explain same-ticket connection handling with appropriate
  itinerary-specific caveats.
- **en:** My ticket has a connection in Frankfurt. If the first flight is late, is the connection handled as part of the same journey?
- **es-ES:** Mi billete tiene una conexión en Fráncfort. Si el primer vuelo se retrasa, ¿la conexión se gestiona como parte del mismo viaje?
- **pt-PT:** O meu bilhete tem uma ligação em Frankfurt. Se o primeiro voo se atrasar, a ligação é tratada como parte da mesma viagem?

### LHG-M3 — Decide — A2

- **Contract:** Compare price and change flexibility under a one-day schedule
  uncertainty without inventing fare terms.
- **en:** I can take a cheaper fare or one that allows changes. My meeting might move by one day. What should I compare?
- **es-ES:** Puedo elegir una tarifa más barata o una que permita cambios. Mi reunión puede cambiar un día. ¿Qué debería comparar?
- **pt-PT:** Posso escolher uma tarifa mais barata ou uma que permita alterações. A minha reunião pode mudar um dia. O que devo comparar?

### LHG-M4 — Act — A3/A4

- **Contract:** Route to the correct same-day rebooking flow without claiming
  modification.
- **en:** I need to request a later flight on the same day. Can you take me into the correct rebooking flow?
- **es-ES:** Necesito solicitar un vuelo más tarde el mismo día. ¿Puedes llevarme al proceso correcto para cambiar la reserva?
- **pt-PT:** Preciso de pedir um voo mais tarde no mesmo dia. Podes encaminhar-me para o processo correto de alteração da reserva?

### LHG-M5 — Change — A4

- **Contract:** Change departure to Friday; preserve destination, passenger, and
  return.
- **en:** Move the departure to Friday but keep the destination, passenger, and return unchanged.
- **es-ES:** Cambia la salida al viernes, pero mantén sin cambios el destino, el pasajero y el regreso.
- **pt-PT:** Muda a partida para sexta-feira, mas mantém sem alterações o destino, o passageiro e o regresso.

### LHG-M6 — Recover — A5

- **Contract:** Resolve relative-date ambiguity by correcting next Friday to
  this Friday and changing nothing else.
- **en:** I meant Friday this week, not next Friday. Please correct only that date.
- **es-ES:** Quería decir este viernes, no el viernes de la semana que viene. Corrige solo esa fecha.
- **pt-PT:** Queria dizer esta sexta-feira, não a sexta-feira da próxima semana. Corrige apenas essa data.

### LHG-M7 — Escalate — A5

- **Contract:** Prevent automatic modification, escalate, and preserve the full
  confirmed itinerary context.
- **en:** The automatic rebooking removes my confirmed connection. I need a person to review the full itinerary before anything changes.
- **es-ES:** El cambio automático elimina mi conexión confirmada. Necesito que una persona revise todo el itinerario antes de que se cambie nada.
- **pt-PT:** A alteração automática elimina a minha ligação confirmada. Preciso que uma pessoa reveja todo o itinerário antes de qualquer alteração.

## FlixBus / Flora

### FLX-M1 — Discover — A1

- **Contract:** Preserve Porto→Lisbon, Saturday morning, and arrival before
  lunch; do not invent availability.
- **en:** I want to travel from Porto to Lisbon on Saturday morning and arrive before lunch. What options should I check?
- **es-ES:** Quiero viajar de Oporto a Lisboa el sábado por la mañana y llegar antes de comer. ¿Qué opciones debería consultar?
- **pt-PT:** Quero viajar do Porto para Lisboa no sábado de manhã e chegar antes do almoço. Que opções devo consultar?

### FLX-M2 — Understand — A1

- **Contract:** Apply current baggage inclusion rules and distinguish what must
  be added.
- **en:** I have one large suitcase and a backpack. What baggage is included and what would need to be added?
- **es-ES:** Llevo una maleta grande y una mochila. ¿Qué equipaje está incluido y qué tendría que añadir?
- **pt-PT:** Levo uma mala grande e uma mochila. Que bagagem está incluída e o que teria de acrescentar?

### FLX-M3 — Decide — A2

- **Contract:** Compare direct/later and earlier/transfer trade-offs without
  inventing reliability guarantees.
- **en:** There are two trips: one is direct but later, the other is earlier with a change. I need to arrive reliably. What should I compare?
- **es-ES:** Hay dos viajes: uno es directo pero sale más tarde y el otro sale antes con transbordo. Necesito llegar con fiabilidad. ¿Qué debería comparar?
- **pt-PT:** Há duas viagens: uma é direta mas sai mais tarde, e a outra sai mais cedo com transbordo. Preciso de chegar com fiabilidade. O que devo comparar?

### FLX-M4 — Act — A3/A4

- **Contract:** Provide a supported add-baggage path or correct next step; no
  false modification claim.
- **en:** I want to add an extra bag to an existing trip. Can you do that here or take me to the correct booking step?
- **es-ES:** Quiero añadir una pieza de equipaje extra a un viaje que ya tengo. ¿Puedes hacerlo aquí o llevarme al paso correcto de la reserva?
- **pt-PT:** Quero acrescentar uma peça de bagagem extra a uma viagem que já tenho. Podes fazê-lo aqui ou encaminhar-me para o passo correto da reserva?

### FLX-M5 — Change — A4

- **Contract:** Change Saturday to Sunday and preserve Porto, Lisbon, and the
  passenger.
- **en:** Change my Saturday trip to Sunday, but keep Porto, Lisbon, and the passenger the same.
- **es-ES:** Cambia mi viaje del sábado al domingo, pero mantén Oporto, Lisboa y el mismo pasajero.
- **pt-PT:** Altera a minha viagem de sábado para domingo, mas mantém Porto, Lisboa e o mesmo passageiro.

### FLX-M6 — Recover — A5

- **Contract:** Correct only the destination stop to Lisbon Oriente; preserve
  day and departure city.
- **en:** I said Lisbon, but I actually need Lisbon Oriente. Keep the same day and departure city. Please correct just the stop.
- **es-ES:** Dije Lisboa, pero en realidad necesito Lisboa Oriente. Mantén el mismo día y la ciudad de salida. Corrige solo la parada.
- **pt-PT:** Disse Lisboa, mas na verdade preciso de Lisboa Oriente. Mantém o mesmo dia e a cidade de partida. Corrige apenas a paragem.

### FLX-M7 — Escalate — A5

- **Contract:** Route a cancellation/connection failure to appropriate support
  while preserving the connection consequence.
- **en:** My bus was cancelled and the replacement doesn't let me make my connection. I need support to review alternatives.
- **es-ES:** Mi autobús fue cancelado y la alternativa no me permite llegar a mi conexión. Necesito que soporte revise otras opciones.
- **pt-PT:** O meu autocarro foi cancelado e a alternativa não me permite fazer a ligação. Preciso que o apoio reveja outras opções.

## KAYAK / Ask AI

### KYK-M1 — Discover — A1

- **Contract:** Preserve three nights, Porto origin, October, nonstop
  preference, and flights under four hours.
- **en:** Find me a three-night city break from Porto in October, nonstop if possible, with flights under four hours.
- **es-ES:** Búscame una escapada urbana de tres noches desde Oporto en octubre, sin escalas si es posible y con vuelos de menos de cuatro horas.
- **pt-PT:** Encontra-me uma escapadinha de três noites a partir do Porto em outubro, de preferência sem escalas e com voos com menos de quatro horas.

### KYK-M2 — Understand — A1

- **Contract:** Explain self-transfer and checked-baggage implications without
  guarantees.
- **en:** When a result says 'self-transfer', what does that mean for me if I have checked baggage?
- **es-ES:** Cuando un resultado dice 'self-transfer', ¿qué significa para mí si llevo equipaje facturado?
- **pt-PT:** Quando um resultado diz 'self-transfer', o que significa para mim se tiver bagagem de porão?

### KYK-M3 — Decide — A2

- **Contract:** Retain prior trip state and weight short direct travel more than
  absolute cheapest price.
- **en:** Compare Rome and Copenhagen for that trip. I care more about a short direct flight than the absolute cheapest price.
- **es-ES:** Compara Roma y Copenhague para ese viaje. Me importa más que el vuelo directo sea corto que conseguir el precio absolutamente más barato.
- **pt-PT:** Compara Roma e Copenhaga para essa viagem. Dou mais importância a um voo direto curto do que ao preço absolutamente mais baixo.

### KYK-M4 — Act — A3/A4

- **Contract:** Distinguish recommendation from purchase and require final
  itinerary/price review.
- **en:** Show me the best matching bookable option, but don't assume I want to purchase it. I want to review the final itinerary and price first.
- **es-ES:** Muéstrame la mejor opción que se pueda reservar, pero no des por hecho que quiero comprarla. Quiero revisar primero el itinerario final y el precio.
- **pt-PT:** Mostra-me a melhor opção que possa ser reservada, mas não assumas que a quero comprar. Quero rever primeiro o itinerário final e o preço.

### KYK-M5 — Change — A4

- **Contract:** Change month to November and exclude London; preserve three
  nights and Porto origin.
- **en:** Keep the three nights, but change the trip to November and exclude London.
- **es-ES:** Mantén las tres noches, pero cambia el viaje a noviembre y excluye Londres.
- **pt-PT:** Mantém as três noites, mas muda a viagem para novembro e exclui Londres.

### KYK-M6 — Recover — A5

- **Contract:** Recover from a soft-constraint violation by making nonstop a
  hard requirement and rerunning the comparison.
- **en:** You included a connecting flight. I asked for nonstop if possible. Re-run the comparison with nonstop as a hard requirement.
- **es-ES:** Has incluido un vuelo con escala. Pedí vuelo directo si era posible. Repite la comparación tratando el vuelo directo como requisito obligatorio.
- **pt-PT:** Incluíste um voo com escala. Pedi voo direto se fosse possível. Repete a comparação tratando o voo direto como requisito obrigatório.

### KYK-M7 — Escalate / boundary — A5

- **Contract:** State the authority boundary truthfully and identify who can
  verify a third-party fare guarantee.
- **en:** I need someone to guarantee that this third-party fare can be changed after purchase. Can you guarantee that, or tell me who actually can?
- **es-ES:** Necesito que alguien me garantice que esta tarifa de un tercero se puede cambiar después de comprarla. ¿Puedes garantizarlo o decirme quién puede hacerlo?
- **pt-PT:** Preciso que alguém garanta que esta tarifa de um terceiro pode ser alterada depois da compra. Podes garantir isso ou dizer-me quem o pode fazer?

## Trip.com / TripGenie

### TRP-M1 — Discover — A1

- **Contract:** Preserve four nights, Madrid→Porto, early October, two adults,
  central hotel, and no rental car.
- **en:** Plan a four-night trip from Madrid to Porto in early October for two adults, with a central hotel and no rental car.
- **es-ES:** Planifica un viaje de cuatro noches de Madrid a Oporto a principios de octubre para dos adultos, con un hotel céntrico y sin coche de alquiler.
- **pt-PT:** Planeia uma viagem de quatro noites de Madrid para o Porto no início de outubro para dois adultos, com hotel no centro e sem carro alugado.

### TRP-M2 — Understand — A1

- **Contract:** Explain what a user should verify before accepting a
  non-refundable rate; do not invent rate-specific terms.
- **en:** If a hotel rate is non-refundable, what should I verify before choosing it?
- **es-ES:** Si una tarifa de hotel no es reembolsable, ¿qué debería comprobar antes de elegirla?
- **pt-PT:** Se uma tarifa de hotel não for reembolsável, o que devo confirmar antes de a escolher?

### TRP-M3 — Decide — A2

- **Contract:** Preserve trip state and prioritize quiet rooms and free
  cancellation over breakfast using grounded current results where available.
- **en:** Compare two central Porto hotels for this trip. Prefer quieter rooms and free cancellation over breakfast.
- **es-ES:** Compara dos hoteles céntricos de Oporto para este viaje. Da prioridad a habitaciones tranquilas y cancelación gratuita antes que al desayuno.
- **pt-PT:** Compara dois hotéis no centro do Porto para esta viagem. Dá prioridade a quartos tranquilos e cancelamento gratuito em vez de pequeno-almoço.

### TRP-M4 — Act — A3/A4

- **Contract:** Reach a matching bookable option and stop before payment or
  final confirmation.
- **en:** Take me to a bookable option that matches those requirements, but stop before any payment or final confirmation.
- **es-ES:** Llévame a una opción que se pueda reservar y cumpla esos requisitos, pero detente antes de cualquier pago o confirmación final.
- **pt-PT:** Leva-me até uma opção que possa ser reservada e cumpra esses requisitos, mas para antes de qualquer pagamento ou confirmação final.

### TRP-M5 — Change — A4

- **Contract:** Preserve hotel preferences; change four nights to three and move
  the trip one week later.
- **en:** Keep the hotel preferences, but make it three nights instead of four and move the trip one week later.
- **es-ES:** Mantén las preferencias del hotel, pero cambia el viaje de cuatro noches a tres y muévelo una semana más tarde.
- **pt-PT:** Mantém as preferências do hotel, mas muda a viagem de quatro noites para três e passa-a uma semana para a frente.

### TRP-M6 — Recover — A5

- **Contract:** Restore two adults while preserving new dates and hotel
  preferences.
- **en:** You changed the number of travellers. It is still two adults. Fix that, keep the new dates, and don't change the hotel preferences.
- **es-ES:** Has cambiado el número de viajeros. Siguen siendo dos adultos. Corrígelo, mantén las nuevas fechas y no cambies las preferencias del hotel.
- **pt-PT:** Alteraste o número de viajantes. Continuam a ser dois adultos. Corrige isso, mantém as novas datas e não alteres as preferências do hotel.

### TRP-M7 — Escalate / boundary — A5

- **Contract:** Do not infer booking or payment state; escalate the conflicting
  hotel/app status appropriately.
- **en:** The hotel says my booking exists, but the app says it failed. I need a person to check whether I have actually been charged and booked.
- **es-ES:** El hotel dice que mi reserva existe, pero la aplicación dice que ha fallado. Necesito que una persona compruebe si realmente me han cobrado y si tengo reserva.
- **pt-PT:** O hotel diz que a minha reserva existe, mas a aplicação diz que falhou. Preciso que uma pessoa confirme se fui realmente cobrado e se a reserva existe.

## IKEA / Billie

### IKEA-M1 — Discover — A1

- **Contract:** Preserve 120 cm maximum width, 60 cm maximum depth, desk use,
  and local-catalog boundary.
- **en:** I need a desk for a 120 cm-wide space, no more than 60 cm deep, for a small home office. What should I look at?
- **es-ES:** Necesito un escritorio para un espacio de 120 cm de ancho y no más de 60 cm de fondo, para un despacho pequeño en casa. ¿Qué debería mirar?
- **pt-PT:** Preciso de uma secretária para um espaço com 120 cm de largura e no máximo 60 cm de profundidade, para um pequeno escritório em casa. O que devo procurar?

### IKEA-M2 — Understand — A1

- **Contract:** Explain market-specific delivery vs local-store availability
  and request postcode/address only when necessary.
- **en:** If an item is available for delivery but not in my local store, does that mean I can still order it to my address?
- **es-ES:** Si un artículo está disponible para entrega pero no en mi tienda local, ¿significa que aún puedo pedirlo para mi dirección?
- **pt-PT:** Se um artigo estiver disponível para entrega mas não na minha loja local, isso significa que ainda o posso encomendar para a minha morada?

### IKEA-M3 — Decide — A2

- **Contract:** Compare only fitting desks and prioritize storage/cable
  management over lowest price.
- **en:** Compare two desks that fit 120 by 60 cm. I care more about storage and cable management than the lowest price.
- **es-ES:** Compara dos escritorios que quepan en 120 por 60 cm. Me importan más el almacenamiento y la gestión de cables que el precio más bajo.
- **pt-PT:** Compara duas secretárias que caibam num espaço de 120 por 60 cm. Dou mais importância a arrumação e organização de cabos do que ao preço mais baixo.

### IKEA-M4 — Act — A3/A4

- **Contract:** Show the correct product and delivery-check path; do not place
  an order.
- **en:** Show me the correct product page and delivery-check step for the option that fits, but don't place an order.
- **es-ES:** Muéstrame la página correcta del producto y el paso para comprobar la entrega de la opción que encaja, pero no hagas ningún pedido.
- **pt-PT:** Mostra-me a página correta do produto e o passo para verificar a entrega da opção que serve, mas não faças nenhuma encomenda.

### IKEA-M5 — Change — A4

- **Contract:** Preserve 120 cm width and storage preference; change only maximum
  depth to 70 cm.
- **en:** Keep the 120 cm width limit, but I can now go up to 70 cm deep. Don't change my storage preference.
- **es-ES:** Mantén el límite de 120 cm de ancho, pero ahora puedo llegar hasta 70 cm de fondo. No cambies mi preferencia por el almacenamiento.
- **pt-PT:** Mantém o limite de 120 cm de largura, mas agora posso ir até 70 cm de profundidade. Não alteres a minha preferência por arrumação.

### IKEA-M6 — Recover — A5

- **Contract:** Find the correct local damaged-part path while preserving the
  preference for a replacement part over full return; do not invent a remedy.
- **en:** The product arrived with one damaged panel. I don't want to return the whole desk if a replacement part is possible. What is the right path?
- **es-ES:** El producto llegó con un panel dañado. No quiero devolver todo el escritorio si es posible sustituir solo la pieza. ¿Cuál es el proceso correcto?
- **pt-PT:** O produto chegou com um painel danificado. Não quero devolver a secretária inteira se for possível substituir apenas a peça. Qual é o procedimento correto?

### IKEA-M7 — Escalate — A5

- **Contract:** Route to the correct human support path for a missing replacement
  part when automation only offers full return.
- **en:** The automated process only offers a full return, but I need help with a missing replacement part. Please get me to the right human support route.
- **es-ES:** El proceso automático solo ofrece devolverlo todo, pero necesito ayuda con una pieza de sustitución que falta. Llévame al canal correcto de atención humana.
- **pt-PT:** O processo automático só me oferece a devolução total, mas preciso de ajuda com uma peça de substituição em falta. Encaminha-me para o apoio humano correto.

## Vodafone / TOBi

### VDF-M1 — Discover — A1

- **Contract:** Establish the Portugal market and Spain travel pattern before
  recommending plan features.
- **en:** I need a mobile plan mainly for Portugal, but I travel to Spain twice a month. What plan features should I compare?
- **es-ES:** Necesito una tarifa móvil sobre todo para Portugal, pero viajo a España dos veces al mes. ¿Qué características debería comparar?
- **pt-PT:** Preciso de um tarifário móvel sobretudo para Portugal, mas vou a Espanha duas vezes por mês. Que características devo comparar?

### VDF-M2 — Understand — A1

- **Contract:** Apply market/plan-specific roaming caveats; do not rely on a
  generic EU assumption.
- **en:** Does my plan use the same mobile data allowance when I am in Spain, or are there roaming limits I need to check?
- **es-ES:** ¿Mi tarifa usa la misma cantidad de datos móviles cuando estoy en España o hay límites de roaming que tengo que comprobar?
- **pt-PT:** O meu tarifário usa o mesmo plafond de dados móveis quando estou em Espanha ou há limites de roaming que tenho de confirmar?

### VDF-M3 — Decide — A2

- **Contract:** Compare domestic data and roaming trade-offs for 20 GB/month and
  frequent Spain travel without inventing a plan.
- **en:** I use about 20 GB a month and travel to Spain often. Should I prioritize more domestic data or roaming conditions?
- **es-ES:** Uso unos 20 GB al mes y viajo a España a menudo. ¿Debería dar prioridad a más datos nacionales o a las condiciones de roaming?
- **pt-PT:** Uso cerca de 20 GB por mês e vou muitas vezes a Espanha. Devo dar prioridade a mais dados nacionais ou às condições de roaming?

### VDF-M4 — Act — A3/A4

- **Contract:** State authentication and information prerequisites before any
  change; do not silently add an option.
- **en:** I want to see whether I can add an EU roaming option to my line. Check what information you need before anything changes.
- **es-ES:** Quiero comprobar si puedo añadir una opción de roaming UE a mi línea. Dime qué información necesitas antes de que se cambie nada.
- **pt-PT:** Quero verificar se posso acrescentar uma opção de roaming UE ao meu número. Diz-me de que informação precisas antes de qualquer alteração.

### VDF-M5 — Change — A4

- **Contract:** Change only the roaming add-on and preserve the base plan and all
  other account state.
- **en:** Don't change my base plan. I only want to change the roaming add-on. Keep everything else as it is.
- **es-ES:** No cambies mi tarifa principal. Solo quiero cambiar el extra de roaming. Mantén todo lo demás igual.
- **pt-PT:** Não alteres o meu tarifário principal. Quero apenas alterar o extra de roaming. Mantém tudo o resto igual.

### VDF-M6 — Recover — A5

- **Contract:** Do not mark solved while mobile data remains unavailable; resume
  troubleshooting with preserved context.
- **en:** You said my data issue was fixed, but the phone still has no mobile data. Don't mark this as solved. What should we check next?
- **es-ES:** Has dicho que mi problema de datos estaba resuelto, pero el teléfono sigue sin tener datos móviles. No lo marques como solucionado. ¿Qué debemos comprobar ahora?
- **pt-PT:** Disseste que o meu problema de dados estava resolvido, mas o telemóvel continua sem dados móveis. Não marques isto como resolvido. O que devemos verificar a seguir?

### VDF-M7 — Escalate — A5

- **Contract:** Escalate after repeated unsuccessful troubleshooting and preserve
  diagnostic context so the user does not restart.
- **en:** I've repeated the same troubleshooting twice and the service is still down. I need a person, and I don't want to start the diagnosis again from zero.
- **es-ES:** He repetido dos veces las mismas comprobaciones y el servicio sigue caído. Necesito hablar con una persona y no quiero empezar el diagnóstico otra vez desde cero.
- **pt-PT:** Já repeti duas vezes as mesmas verificações e o serviço continua em baixo. Preciso de falar com uma pessoa e não quero recomeçar o diagnóstico do zero.

## Zalando / Assistant

### ZAL-M1 — Discover — A1

- **Contract:** Preserve waterproof, black, ankle boots, daily walking, women's
  EU size 38, EUR, and budget under €120.
- **en:** I need waterproof black ankle boots for daily walking, women's EU size 38, under €120.
- **es-ES:** Necesito botines negros impermeables para caminar a diario, talla 38 de mujer, por menos de 120 €.
- **pt-PT:** Preciso de botins pretos impermeáveis para caminhar todos os dias, tamanho 38 de mulher, por menos de 120 €.

### ZAL-M2 — Understand — A1

- **Contract:** Explain evidence to check before changing size when a product is
  described as running small; do not issue a size guarantee.
- **en:** A shoe says it runs small. If I normally wear EU 38, what should I check before choosing a different size?
- **es-ES:** Un zapato indica que talla pequeño. Si normalmente uso un 38 europeo, ¿qué debería comprobar antes de elegir otra talla?
- **pt-PT:** Um sapato indica que calça pequeno. Se normalmente uso o tamanho 38 europeu, o que devo verificar antes de escolher outro tamanho?

### ZAL-M3 — Decide — A2

- **Contract:** Compare waterproof black boots in EU 38 while prioritizing
  comfort and easy returns over brand.
- **en:** Compare two waterproof black boots in size 38. I care more about walking comfort and easy returns than brand.
- **es-ES:** Compara dos botines negros impermeables en talla 38. Me importan más la comodidad para caminar y la facilidad de devolución que la marca.
- **pt-PT:** Compara dois botins pretos impermeáveis no tamanho 38. Dou mais importância ao conforto para caminhar e à facilidade de devolução do que à marca.

### ZAL-M4 — Act — A3/A4

- **Contract:** Show the best matching product for the user's market and stop
  before order placement.
- **en:** Show me the product that best matches those requirements in my market, but don't place an order.
- **es-ES:** Muéstrame el producto que mejor cumpla esos requisitos en mi mercado, pero no hagas ningún pedido.
- **pt-PT:** Mostra-me o produto que melhor corresponde a esses requisitos no meu mercado, mas não faças nenhuma encomenda.

### ZAL-M5 — Change — A4

- **Contract:** Preserve all prior constraints; raise budget to €150 and exclude
  suede only.
- **en:** Keep everything else the same, but raise the budget to €150 and exclude suede.
- **es-ES:** Mantén todo lo demás igual, pero sube el presupuesto a 150 € y excluye el ante.
- **pt-PT:** Mantém tudo o resto igual, mas aumenta o orçamento para 150 € e exclui camurça.

### ZAL-M6 — Recover — A5

- **Contract:** Preserve size correction from 39 to 38 and identify the correct
  market-specific exchange/return path.
- **en:** The boots arrived in the wrong size. I need size 38, not 39. What is the correct exchange or return path for my market?
- **es-ES:** Los botines llegaron en la talla equivocada. Necesito la 38, no la 39. ¿Cuál es el proceso correcto de cambio o devolución en mi mercado?
- **pt-PT:** Os botins chegaram no tamanho errado. Preciso do 38, não do 39. Qual é o procedimento correto de troca ou devolução no meu mercado?

### ZAL-M7 — Escalate — A5

- **Contract:** Do not invent refund status; authenticate or escalate to verify
  the actual return and payment state.
- **en:** The return shows as delivered, but I still don't have the refund. I need support to check the actual return and payment status.
- **es-ES:** La devolución aparece como entregada, pero todavía no tengo el reembolso. Necesito que soporte compruebe el estado real de la devolución y del pago.
- **pt-PT:** A devolução aparece como entregue, mas ainda não recebi o reembolso. Preciso que o apoio verifique o estado real da devolução e do pagamento.

## Catalog invariants

- Exactly ten candidate agents are represented.
- Every agent has exactly M1–M7.
- Every seed has one `en`, one `es-ES`, and one `pt-PT` candidate surface.
- The catalog therefore contains 70 semantic seeds and 210 candidate surfaces.
- No scenario authorizes a purchase, payment, booking, account, order, or other
  consequential mutation.
- No scenario authorizes transferring the interaction to an unwitting human;
  escalation observations stop once a valid handoff route is offered.
- An unavailable operation is evaluated through truthful capability-boundary
  handling and observability, not forced execution.
- Surface wording may change through qualified review without weakening the
  semantic contract or acceptance rubric; every change requires a new variant
  version and review record.
