import { motion } from "framer-motion";
import { ExternalLink, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ReferenceCard = ({ reference, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <Card className="bg-gray-900/60 border-gray-600/30 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 group">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-cyan-400 flex items-center justify-between">
            <span className="truncate">{reference.title}</span>
            <ExternalLink className="w-3 h-3 flex-shrink-0 ml-2 opacity-60 group-hover:opacity-100 transition-opacity" />
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {reference.year}
            </span>
            <span className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded">
              {reference.type}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReferenceCard;
