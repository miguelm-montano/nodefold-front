import { Joyride, STATUS } from "react-joyride";

const steps = [
  {
    target: '[data-tour="create-folder"]',
    title: "Create your first folder",
    content:
      "Click here to create a folder. Folders help you organize your resources by project or category.",
    disableBeacon: true,
    placement: "right",
  },
  {
    target: '[data-tour="add-resource"]',
    title: "Add a resource",
    content:
      "Click + to open the upload modal. You can add images, fonts, color palettes, icons and web links.",
    placement: "bottom",
  },
  {
    target: "body",
    title: "Upload modal",
    content:
      "Choose the resource type, select a folder, paste a URL or drop a file, add a title and optional tags.",
    placement: "center",
  },
  {
    target: "body",
    title: "Resource detail panel",
    content:
      "Click any resource card to open the detail panel on the right. From there you can edit the title, description, URL and tags — or delete the resource.",
    placement: "center",
  },
  {
    target: '[data-tour="sidebar-filters"]',
    title: "Filter your resources",
    content:
      "Use All, Tagged and Untagged to quickly find what you're looking for across all your folders.",
    placement: "right",
  },
];

export default function DashboardTour({ run, onEnd }) {
  const handleCallback = ({ status }) => {
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      onEnd();
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      showProgress
      callback={handleCallback}
      styles={{
        options: {
          primaryColor: "#111827",
          zIndex: 10000,
        },
        tooltip: {
          padding: "24px",
        },
        tooltipTitle: {
          fontWeight: "700",
          fontSize: "20px",
        },
      }}
      locale={{
        back: "Back",
        close: "Close",
        last: "Finish",
        next: "Next",
        skip: "Skip tour",
      }}
    />
  );
}
