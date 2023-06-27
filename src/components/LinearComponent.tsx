import {
  createViewState,
  JBrowseLinearGenomeView,
} from "@jbrowse/react-linear-genome-view";

export default function DemoComponent() {
  const state = createViewState({
    assembly: undefined,
    tracks: [],
  });
  return <JBrowseLinearGenomeView viewState={state} />;
}
