import type { Capability, ServiceMeta } from "@/content/services/types";
import { breadcrumbJsonLd, JsonLd, serviceJsonLd } from "@/lib/seo";

/** Service + BreadcrumbList structured data for a service page. */
export function ServiceSchema({ meta, offers }: { meta: ServiceMeta; offers: Capability[] }) {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: meta.name,
          description: meta.description,
          path: meta.path,
          serviceType: meta.serviceType,
          offers: offers.map((o) => o.title),
        })}
      />
      <JsonLd data={breadcrumbJsonLd(meta.name, meta.path)} />
    </>
  );
}
