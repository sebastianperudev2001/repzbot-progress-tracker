import { ConsultationType, consultationTypeLabels } from "@/types/consultation";
import { Button } from "@/components/ui/button";
import { ChartBarIcon, ChartLineIcon, LightbulbIcon } from "lucide-react";

interface ConsultationTypeSelectorProps {
  selectedType: ConsultationType;
  onTypeSelect: (type: ConsultationType) => void;
}

const typeIcons = {
  [ConsultationType.PROGRESS]: ChartLineIcon,
  [ConsultationType.STATISTICS]: ChartBarIcon,
  [ConsultationType.RECOMMENDATIONS]: LightbulbIcon,
};

export function ConsultationTypeSelector({
  selectedType,
  onTypeSelect,
}: ConsultationTypeSelectorProps) {
  return (
    <div className="flex gap-2 mb-4">
      {Object.values(ConsultationType).map((type) => {
        const Icon = typeIcons[type];
        return (
          <Button
            key={type}
            variant={selectedType === type ? "default" : "outline"}
            className="flex-1 gap-2"
            onClick={() => onTypeSelect(type)}
          >
            <Icon className="h-4 w-4" />
            {consultationTypeLabels[type]}
          </Button>
        );
      })}
    </div>
  );
}
