import {Skeleton} from "../components/Skeleton";

export default function TopicLoading() {
  // Reusing the identical theme classes to ensure the skeleton flashes
  // with the exact same background and border colors as the final layout.
  const themeClasses = {
    page: "bg-[#FFFFFF] text-[#111111] dark:bg-[#050505] dark:text-[#F5F5F5]",
    sidebar: "bg-[#F7F7F7] dark:bg-[#101010]",
    header: "bg-[#FFFFFF]/90 dark:bg-[#050505]/90",
    border: "border-[#E5E5E5] dark:border-[#222222]",
  };

  return (
    <div className={`${themeClasses.page} min-h-screen font-sans flex flex-col overflow-hidden`}>
      {/* Header Placeholder */}
      <header className={`sticky top-0 z-40 h-16 border-b ${themeClasses.border} ${themeClasses.header} backdrop-blur-md`}>
        <div className="mx-auto flex h-full max-w-[1700px] items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Icon / Logo Placeholder */}
            <Skeleton className="h-7 w-7 rounded-md lg:rounded-full" />
            <Skeleton className="hidden lg:block h-4 w-16 rounded" />
          </div>

          <div className="flex-1 flex justify-center px-4 max-w-2xl mx-auto">
            {/* Command Palette Search Placeholder */}
            <Skeleton className="h-8 w-full rounded-full" />
          </div>

          {/* Theme Toggle Placeholder */}
          <Skeleton className="shrink-0 h-8 w-[70px] rounded-full" />
        </div>
      </header>

      <div className="flex-1 mx-auto flex w-full max-w-[1700px]">
        
        {/* Left Sidebar (Directory) Placeholder */}
        <aside className={`sticky top-16 hidden h-[calc(100vh-4rem)] w-[280px] shrink-0 overflow-hidden border-r lg:block ${themeClasses.sidebar} ${themeClasses.border}`}>
          <div className="px-5 py-8">
            <Skeleton className="h-3 w-20 mb-8 rounded" />
            <div className="space-y-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-4 w-4 rounded shrink-0" />
                  <Skeleton 
                    variant="text" 
                    className={`h-4 rounded ${i % 3 === 0 ? 'w-3/4' : i % 2 === 0 ? 'w-1/2' : 'w-5/6'}`} 
                  />
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 flex flex-col relative">
          
          {/* Breadcrumbs Placeholder */}
          <div className={`sticky top-16 z-30 flex items-center gap-3 py-3 px-5 md:px-10 xl:px-16 border-b ${themeClasses.border} ${themeClasses.header} backdrop-blur-md`}>
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-3 w-16 rounded" />
            <Skeleton className="h-3 w-24 rounded" />
          </div>

          <div className="flex-1 px-5 pb-16 pt-6 md:px-10 lg:pt-10 xl:px-16 max-w-4xl mx-auto w-full">
            
            {/* Title & Description Placeholder */}
            <Skeleton className="h-12 w-3/4 sm:w-1/2 mb-6 rounded-lg" />
            <div className="space-y-3 mb-10">
              <Skeleton variant="text" className="h-5 w-full rounded" />
              <Skeleton variant="text" className="h-5 w-11/12 rounded" />
            </div>

            {/* Paragraph 1 Placeholder */}
            <div className="space-y-4 mb-10">
              <Skeleton variant="text" className="h-4 w-full rounded" />
              <Skeleton variant="text" className="h-4 w-full rounded" />
              <Skeleton variant="text" className="h-4 w-5/6 rounded" />
            </div>

            {/* Code Block Placeholder */}
            <Skeleton className="h-64 w-full rounded-xl mb-10" />

            {/* Subheading & Paragraph 2 Placeholder */}
            <Skeleton className="h-8 w-1/3 mb-6 rounded" />
            <div className="space-y-4 mb-10">
              <Skeleton variant="text" className="h-4 w-full rounded" />
              <Skeleton variant="text" className="h-4 w-11/12 rounded" />
              <Skeleton variant="text" className="h-4 w-4/5 rounded" />
            </div>
            
            {/* Secondary Code/Data Block Placeholder */}
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
        </main>

        {/* Right Sidebar (Table of Contents) Placeholder */}
        <aside className={`sticky top-16 hidden h-[calc(100vh-4rem)] w-[260px] shrink-0 overflow-hidden border-l xl:block ${themeClasses.sidebar} ${themeClasses.border}`}>
          <div className="px-6 py-10">
            <Skeleton className="h-3 w-24 mb-6 rounded" />
            <div className="space-y-5">
              <div>
                <Skeleton variant="text" className="h-3 w-3/4 rounded mb-3" />
                <div className={`border-l ml-[3px] pl-3 space-y-3 ${themeClasses.border}`}>
                  <Skeleton variant="text" className="h-2.5 w-4/5 rounded" />
                  <Skeleton variant="text" className="h-2.5 w-5/6 rounded" />
                </div>
              </div>
              <div>
                <Skeleton variant="text" className="h-3 w-full rounded mb-3" />
                <div className={`border-l ml-[3px] pl-3 space-y-3 ${themeClasses.border}`}>
                  <Skeleton variant="text" className="h-2.5 w-2/3 rounded" />
                </div>
              </div>
              <Skeleton variant="text" className="h-3 w-5/6 rounded" />
              <Skeleton variant="text" className="h-3 w-4/5 rounded" />
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}