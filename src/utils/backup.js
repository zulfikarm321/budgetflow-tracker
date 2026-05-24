export function exportBackup() {
  const data = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key?.startsWith("budget-month-")) {
      data[key] = JSON.parse(localStorage.getItem(key));
    }
  }

  const blob = new Blob(
    [
      JSON.stringify(
        data,

        null,

        2,
      ),
    ],

    {
      type: "application/json",
    },
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = "budgetflow-backup.json";

  a.click();

  URL.revokeObjectURL(url);
}

export function importBackup(
  file,

  callback,
) {
  const reader = new FileReader();

  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);

      Object.entries(data).forEach(([key, value]) => {
        localStorage.setItem(
          key,

          JSON.stringify(value),
        );
      });

      callback(true);
    } catch {
      callback(false);
    }
  };

  reader.readAsText(file);
}
