import { IPublisher } from "@/types/MovieForm";

interface PublisherDropdown {
  publishers: IPublisher[];
  selectedPublisher: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: { genre?: string; publisher?: string };
}

export default function PublisherDropdown({publishers, selectedPublisher, onChange, error}: PublisherDropdown) {
  return (
    <>
      <label htmlFor="publisher">Publisher</label>
      <select
        onChange={onChange}
        value={selectedPublisher}
        className="p-1"
        id="publisher"
        name="publisher"
      >
        <option value="">Select a publisher</option>
        {publishers.map((publisher) => (
          <option key={publisher.id} value={publisher.id}>
            {publisher.publisher_name}
          </option>
        ))}
      </select>
      {error.publisher && <p className="text-red-500">{error.publisher}</p>}
    </>
  );
}
