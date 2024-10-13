export const dateFormatter = (dateStr: string) => {
    const date = new Date(dateStr);
  
    // Extract month and year
    const options = { year: "numeric", month: "long" };
    const formattedDate = date.toLocaleDateString("en-US", options as any);
  
    return formattedDate;
  };