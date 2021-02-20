import { useState } from "react";
import "./App.css";
import { Timer, DarkMode } from "./components";
import "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { Feeding, FeedingType } from "./components/Feeding";
import { Daily, Code } from "./components";
import { getCode } from "./components/Code";

function App() {
  const f = useFirestore();

  const code = getCode();

  const collectionRef = f.collection(code).orderBy("endedAt", "desc");
  const { data } = useFirestoreCollectionData<FeedingType>(collectionRef);
  console.log(data);

  return (
    <div className="flex flex-col items-center min-h-screen pt-16 text-gray-900 dark:bg-gray-800 dark:text-gray-100 App">
      <DarkMode />
      <Code />
      <div className="mb-8">
        <Timer
          onSave={(feeding) => {
            if (code) {
              f.collection(code).add({ ...feeding });
            }
          }}
        />
      </div>
      {data ? (
        <>
          <Daily feedings={data} />
          {data.reverse().map((f) => (
            <Feeding feeding={f} key={f.startedAt} />
          ))}
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default App;
