import React from "react";
import {
  render,
  waitForElement,
  fireEvent,
  queryByTestId,
  waitForDomChange
} from "@testing-library/react";
import "@testing-library/jest-dom";
import ViadeModal from "../Modal";

let modal;
let mock = jest.fn();
let rerenderFunc;
beforeEach(() => {
  const { container, rerender } = render(
    <ViadeModal
      title="Submitted"
      onClick={mock}
      saveText="Save"
      closeText="Close"
    ></ViadeModal>
  );
  modal = container;
  rerenderFunc = rerender;
});

describe("All renders correctly with normal settings", () => {
  test("title is rendered", () => {
    fireEvent.click(queryByTestId(modal, "modalButton"));
    expect(mock).toBeCalled();
    waitForDomChange(() => {
      expect(queryByTestId(modal, "modalTitle").textContent).not.toBeNull();
      expect(queryByTestId(modal, "modalTitle").textContent).toBe("Submitted");
    });
  });

  test("buttons are rendered", () => {
    fireEvent.click(queryByTestId(modal, "modalButton"));
    waitForDomChange(() => {
      expect(queryByTestId(modal, "modalSaveButton")).not.toBeNull();
      expect(queryByTestId(modal, "modalSaveButton")).toBe("Save");
      expect(queryByTestId(modal, "modalCloseButton")).not.toBeNull();
      expect(queryByTestId(modal, "modalCloseButton")).toBe("Close");
    });
  });
});

describe("Buttons are rendered with different settings", () => {
  test("render save button but not cancel button", () => {
    rerenderFunc(
      <ViadeModal title="Title" onClick={mock} saveText="Save"></ViadeModal>
    );
    waitForElement(() => {
      fireEvent.click(queryByTestId(modal, "modalButton"));
      waitForDomChange(() => {
        expect(queryByTestId(modal, "modalSaveButton")).not.toBeNull();
        expect(queryByTestId(modal, "modalCancelButton")).toBeNull();
        expect(queryByTestId(modal, "modalSaveButton")).toBe("Save");
      });
    });
  });

  test("render cancel button but not save button", () => {
    rerenderFunc(
      <ViadeModal title="Title" onClick={mock} CancelText="Cancel"></ViadeModal>
    );
    waitForElement(() => {
      fireEvent.click(queryByTestId(modal, "modalButton"));
      waitForDomChange(() => {
        expect(queryByTestId(modal, "modalCancelButton")).not.toBeNull();
        expect(queryByTestId(modal, "modalSaveButton")).toBeNull();
        expect(queryByTestId(modal, "modalCancelButton")).toBe("Cancel");
      });
    });
  });
});
