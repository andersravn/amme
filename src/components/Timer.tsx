import { FeedingType } from "./Feeding";
import { useState } from "react";
import { useInterval } from "../utils/hooks/useInterval";
import { Button } from "./Button";

type Props = {
  onStart?: () => void;
  onSave?: (feeding: FeedingType) => void;
  onDiscard?: () => void;
};

export function Timer(props: Props) {
  const { onStart, onSave, onDiscard } = props;

  const [hasStarted, setHasStarted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [secondsRight, setSecondsRight] = useState(0);
  const [leftOn, toggleLeft] = useState(false);
  const [rightOn, toggleRight] = useState(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);

  useInterval(
    () => {
      setSecondsLeft(secondsLeft + 1);
    },
    leftOn ? 1000 : null
  );

  useInterval(
    () => {
      setSecondsRight(secondsRight + 1);
    },
    rightOn ? 1000 : null
  );

  const start = () => {
    if (!hasStarted) {
      onStart?.();
      setHasStarted(true);
      setStartedAt(Date.now());
    }
  };

  const reset = () => {
    setSecondsLeft(0);
    setSecondsRight(0);
    setStartedAt(null);
    toggleLeft(false);
    toggleRight(false);
    setHasStarted(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-center mb-8">
        <div className="flex flex-col text-center">
          {getTime(secondsLeft)}
          <Button
            className={`mr-4 mt-4 ${
              leftOn ? "border-indigo-500 border" : "bg-indigo-500"
            }`}
            onClick={() => {
              start();
              toggleLeft(!leftOn);
              toggleRight(false);
            }}
          >
            Left
          </Button>
        </div>
        <div className="flex flex-col text-center">
          {getTime(secondsRight)}
          <Button
            className={`mt-4 ${
              rightOn ? "border-indigo-500 border" : "bg-indigo-500"
            }`}
            onClick={() => {
              start();
              toggleLeft(false);
              toggleRight(!rightOn);
            }}
          >
            Right
          </Button>
        </div>
      </div>
      <div>
        <Button
          className="bg-green-500"
          onClick={() => {
            onSave?.({
              secondsLeft,
              secondsRight,
              total: secondsLeft + secondsRight,
              startedAt,
              endedAt: Date.now(),
            });
            reset();
          }}
        >
          Save
        </Button>
        <Button
          className="ml-4 text-base text-red-500 "
          onClick={() => {
            onDiscard?.();
            reset();
          }}
        >
          Discard
        </Button>
      </div>
    </div>
  );
}

export function getTime(timeInSeconds: number) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes < 10 ? "0" + minutes.toString() : minutes}:${
    seconds < 10 ? "0" + seconds.toString() : seconds
  }`;
}
