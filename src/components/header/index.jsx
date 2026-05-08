import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1600px] items-center px-4 py-3 sm:px-6 lg:px-8">
        <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          Kanban Board
        </h1>
      </div>
    </header>
  );
};

export default Header;
