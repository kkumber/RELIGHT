import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface Prop {
  icon: IconDefinition;
  data: string | number | undefined;
}

const Statistic = ({ icon, data }: Prop) => {
  return (
    <div className="flex items-center gap-1 text-gray-300">
      <FontAwesomeIcon icon={icon} size="lg" />
      <p className="font-semibold">{data}</p>
    </div>
  );
};

export default Statistic;
