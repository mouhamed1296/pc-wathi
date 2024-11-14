const fetchPCs = async () => {
    try {
      const response = await fetch("/api/pcs");
      const data = await response.json();
      return data.pcs
    } catch (error) {
      console.error("Error fetching PC data:", error);
    }
};

export default fetchPCs;