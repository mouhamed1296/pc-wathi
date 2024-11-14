import { PCType } from "./PCType";

const managePc = async (form: PCType) => {
    try {
        const res = await fetch("/api/pcs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (data.success) {
          return data;
        } else {
          alert("Failed to save data.");
        }
      } catch (error) {
        console.error("Error:", JSON.stringify(error));
      }
}

export default managePc;