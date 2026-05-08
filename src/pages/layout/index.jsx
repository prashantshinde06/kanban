import React from "react";
import Header from "@/components/header";

export default function BaseLayout(props) {
  const { children } = props;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)]">
      <Header />
      <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {children}
      </main>
    </div>
  );
}

BaseLayout.defaultProps = {
  children: [],
  user: {},
};
