import { Joyride, STATUS, EVENTS } from "react-joyride";
import UploadModalGif from "../../../assets/UploadModal.gif";
import SideBar from "../../../assets/SideBar.png";

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
    content: (
      <div>
        <img
          src={UploadModalGif}
          alt="Upload modal demo"
          style={{ borderRadius: "8px", marginBottom: "8px", width: "100%" }}
        />
        <p>
          Choose the resource type, select a folder, paste a URL or drop a file,
          add a title and optional description and tags
        </p>
      </div>
    ),
    placement: "center",
    styles: {
      tooltip: {
        width: "520px",
        paddingLeft: "32px",
        paddingRight: "32px",
      },
    },
  },
  {
    target: "body",
    title: "Resource detail panel",
    content: (
      <div>
        <img
          src={SideBar}
          alt="Resource detail panel demo"
          style={{ borderRadius: "8px", marginBottom: "8px", width: "100%" }}
        />
        <p>
          Click any resource to open the detail panel on the right. From there
          you can edit the title, description, URL and tags — or delete the
          resource.
        </p>
      </div>
    ),
    placement: "center",
    styles: {
      tooltip: {
        width: "580px",
        paddingLeft: "32px",
        paddingRight: "32px",
      },
    },
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
  const handleEvent = ({ type, status }) => {
    if (
      type === EVENTS.TOUR_END &&
      [STATUS.FINISHED, STATUS.SKIPPED].includes(status)
    ) {
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
      onEvent={handleEvent}
      styles={{
        options: {
          primaryColor: "#111827",
          zIndex: 10000,
        },
        tooltip: {
          padding: "24px",
          borderRadius: "16px",
        },
        tooltipTitle: {
          fontWeight: "700",
          fontSize: "20px",
        },
        buttonClose: {
          top: "12px",
          right: "12px",
        },
        tooltipFooter: {
          justifyContent: "space-between",
        },
      }}
    />
  );
}
