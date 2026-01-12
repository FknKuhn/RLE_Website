import { Card, CardBody } from "@heroui/card";
import { ReactNode } from "react";

interface ServiceCardProps {
  children: ReactNode;
  className?: string;
}

export default function ServiceCard({
  children,
  className = "",
}: ServiceCardProps) {
  return (
    <Card
      shadow="lg"
      className={`flex-shrink-0 md:max-w-md border-danger bg-currentcolor bg-gradient-to-t to-white/5 border-l-6 ${className}`}
    >
      <CardBody className="p-10">{children}</CardBody>
    </Card>
  );
}
