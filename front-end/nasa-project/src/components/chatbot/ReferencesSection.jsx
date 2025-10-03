import { motion, AnimatePresence } from "framer-motion";
import { FileText, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReferenceCard from "./ReferenceCard";

const ReferencesSection = ({
  references,
  messageIndex,
  isExpanded,
  onToggle,
}) => {
  if (!references || references.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ delay: 0.3 }}
      className="space-y-2"
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onToggle(messageIndex)}
        className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 transition-colors"
      >
        <FileText className="w-4 h-4 mr-2" />
        {isExpanded ? "Hide" : "Show"} References ({references.length})
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 ml-2" />
        ) : (
          <ChevronDown className="w-4 h-4 ml-2" />
        )}
      </Button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-3 md:grid-cols-2 lg:grid-cols-3"
          >
            {references.map((ref) => (
              <ReferenceCard
                key={ref.id}
                reference={ref}
                delay={ref.id * 0.1}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ReferencesSection;
