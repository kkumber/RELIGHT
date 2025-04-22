// Helper to scroll to a specific page in infinite mode.
const scrollToPage = (page: number) => {
  const element = document.getElementById(`page-${page}`);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export default scrollToPage;
