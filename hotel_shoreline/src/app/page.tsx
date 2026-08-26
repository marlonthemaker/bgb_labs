import { nativeAgentSdkVersion } from "@bomgoodbueno/native-agent-sdk";
import { NativeAdoptionDemo } from "./native-adoption-demo";
import { RunDemo } from "./run-demo";

export default function Home() {
	return (
		<main>
			<p className="eyebrow">Native Agent demonstration</p>
			<h1>Hotel Shoreline</h1>
			<p className="lede">
				A constrained hotel-operations demonstration designed to make task decomposition and
				verified execution visible.
			</p>
			<section aria-label="Demonstration status">
				<h2>Workspace ready</h2>
				<p>
					Native Agent SDK boundary: <code>{nativeAgentSdkVersion}</code>
				</p>
			</section>
			<RunDemo />
			<NativeAdoptionDemo />
			<aside>
				Hotel Shoreline is a fictional demonstration built independently for a hackathon. It is not
				affiliated with, endorsed by, or operated by Google. Demonstration results are illustrative
				and are not research findings.
			</aside>
		</main>
	);
}
