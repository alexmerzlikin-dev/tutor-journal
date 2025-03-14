import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function SettingsCustomizationPage() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>Настройки</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>Оформление</BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
