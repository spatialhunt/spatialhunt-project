type Props = {
  params: Promise<{ id: string }>;
};

export default async function PropertyDetailsPage({ params }: Props) {
  const { id } = await params;

  return (
    <main>
      <h1>Property {id}</h1>
    </main>
  );
}