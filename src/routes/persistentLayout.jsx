import React from "react";
import { Outlet } from "react-router-dom";

import BaseLayout from "@/pages/layout";

const PersistentLayout = () => {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
};

export default PersistentLayout;
