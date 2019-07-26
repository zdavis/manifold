import React from "react";
import { build, storiesOf } from "helpers/storybook/exports";
import Footers from "../index";
import logo from "./logo.jpg";

const pages = build.arrayOf.pages(3);
const text = build.entity.text(
  null,
  {
    metadataFormatted: {
      rights: "Copyright 2012 by the some press, somewhere."
    }
  }
);

const settings = {
  attributes: {
    copyrightFormatted: "© 2018 Press Name Goes Here. Vestibulum id ligula porta felis euismod semper.",
    general: {
      contactEmail: "manifold@manifold.com",
      twitter: "manifoldscholar",
      facebook: "manifoldscholar"
    }
  }
};

const brandedSettings = {
  attributes: {
    copyrightFormatted: "© 2018 Press Name Goes Here. Vestibulum id ligula porta felis euismod semper.",
    pressLogoFooterStyles: {
      original: `/${logo}`
    },
    general: {
      contactEmail: "manifold@manifold.com",
      twitter: "manifoldscholar",
      facebook: "manifoldscholar"
    }
  }
};

storiesOf("Global/Footers", module)
  .add("FE Footer", () => {
    return (
      <Footers.FrontendFooter
        pages={pages}
        authentication={{}}
        commonActions={{}}
        settings={settings}
      />
    )
  })
  .add("FE Footer (Branded)", () => {
    return (
      <Footers.FrontendFooter
        pages={pages}
        authentication={{}}
        commonActions={{}}
        settings={brandedSettings}
      />
    )
  })
  .add("Reader Footer", () => {
    return (
      <Footers.ReaderFooter
        text={text}
      />
    )
  })
  .add("Standalone Footer", () => {
    return (
      <Footers.StandaloneFooter
        pages={pages}
        authentication={{}}
        commonActions={{}}
        settings={brandedSettings}
      />
    )
  })



