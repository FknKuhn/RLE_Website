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
      className={`flex-shrink-0 md:max-w-md border-danger bg-[var(--bg-light)] border-l-[6px] ${className}`}
    >
      <CardBody className="p-10">{children}</CardBody>
    </Card>
  );
}
