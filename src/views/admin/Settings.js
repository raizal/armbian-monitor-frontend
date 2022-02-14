import React from "react";

// components

import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";
import ConfigForm from "../../components/Form/ConfigForm";

export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <ConfigForm />
        </div>
      </div>
    </>
  );
}
