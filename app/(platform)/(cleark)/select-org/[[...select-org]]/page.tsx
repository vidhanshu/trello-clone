import { OrganizationList } from '@clerk/nextjs';

export default function CreateOrgPage() {
  return (
    <div>
      <OrganizationList
        hidePersonal
        afterSelectOrganizationUrl="/organization/:id"
        afterCreateOrganizationUrl="/organization/:id"
      />
    </div>
  );
}
