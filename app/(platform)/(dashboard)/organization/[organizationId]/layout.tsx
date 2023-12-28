import OrgControl from './_components/org-control';

export default function OrganizationIdLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <div>
      <OrgControl />
      {children}
    </div>
  );
}
