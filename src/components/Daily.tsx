import { FeedingType } from "./Feeding";

type Props = {
  feedings: FeedingType[];
};

export function Daily(props: Props) {
  const { feedings } = props;
  return (
    <div className="text-sm text-gray-500">
      <span>{`Past 24 hours: ${
        feedings.filter((f) => {
          if (!f.startedAt) return false;
          if (Date.now() - f.startedAt * 1000 * 60 * 60 < 24) {
            return true;
          } else {
            return false;
          }
        }).length
      } feedings`}</span>
    </div>
  );
}
