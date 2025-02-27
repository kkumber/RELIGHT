import { useEffect, useState } from "react";

const usePageObserver = () => {


  // Setup IntersectionObserver for infinite scroll mode to detect the visible page.
  useEffect(() => {
    if (navMode !== "infinite" || !scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    // Use multiple thresholds to get more granular updates.
    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let visiblePage = 0;
        entries.forEach((entry) => {
          const match = entry.target.id.match(/page-(\d+)/);
          if (match) {
            const pageNumber = parseInt(match[1]);
            if (entry.intersectionRatio > maxRatio) {
              maxRatio = entry.intersectionRatio;
              visiblePage = pageNumber;
            }
          }
        });
        if (visiblePage > 0 && visiblePage !== currentPage) {
          setCurrentPage(visiblePage);
        }
      },
      {
        root: container,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    const observePages = () => {
      const pageElements = container.querySelectorAll("[id^='page-']");
      pageElements.forEach((el) => observer.observe(el));
    };
    observePages();

    return () => {
      observer.disconnect();
    };
  }, [navMode, pdf, pdf?.numPages, currentPage]);

  return (

  );
};

export default usePageObserver;