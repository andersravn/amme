import { getTime } from "./Timer";

export type FeedingType = {
  secondsLeft: number;
  secondsRight: number;
  total: number;
  startedAt: number | null;
  endedAt: number | null;
};

type Props = {
  feeding: FeedingType;
};

export function Feeding(props: Props) {
  const { feeding } = props;
  if (!feeding.startedAt || !feeding.endedAt) return null;
  const startedAt = new Date(feeding.startedAt);
  const endedAt = new Date(feeding.endedAt);
  return (
    <div className="grid grid-cols-6" key={feeding.startedAt}>
      <div className="text-gray-500 ">{`${startedAt.getDate()}/${
        startedAt.getMonth() + 1
      }`}</div>

      <div className="col-span-2">{`${startedAt.getHours()}.${startedAt.getMinutes()} - ${endedAt.getHours()}.${endedAt.getMinutes()}`}</div>

      <div className="mr-1">
        <span className="text-sm text-gray-500">L</span>
        {getTime(feeding.secondsLeft).slice(0, 2)}{" "}
        <span className="text-sm text-gray-500"> min</span>
      </div>
      <div>
        <span className="text-sm text-gray-500">R</span>
        {getTime(feeding.secondsRight).slice(0, 2)}
        <span className="text-sm text-gray-500"> min</span>
      </div>
      <div>
        <span className="text-sm text-gray-500">T</span>
        {getTime(feeding.total).slice(0, 2)}
        <span className="text-sm text-gray-500"> min</span>
      </div>
    </div>
  );
}
