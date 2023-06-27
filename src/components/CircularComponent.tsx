import {
  createViewState,
  JBrowseCircularGenomeView,
} from "@jbrowse/react-circular-genome-view";

export default function DemoComponent() {
  const state = createViewState({
    assembly: undefined,
    tracks: [],
  });
  return <JBrowseCircularGenomeView viewState={state} />;
}
