import Image from "next/image";
import { Book } from "@/types/book";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

export default function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  return (
    <Card className="relative bg-white rounded-lg shadow-md overflow-hidden">
      <CardContent>
        <div className="relative h-[300px] w-full">
          <Image
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      
        <div className="p-4">
          <h3 className="text-lg font-semibold text-black">{book.title}</h3>
          <p className="text-gray-600">{book.author}</p>
          <p className="text-green-600 font-semibold mb-2">
            {book.currency} {book.price.toFixed(2)}
          </p>
          <p className="text-gray-700 text-sm line-clamp-3 mb-4">
            {book.description}
          </p>
          <div className="mt-4 flex gap-2">
            <Button
              variant="secondary"
              onClick={() => onEdit(book)}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={() => onDelete(book.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </CardContent> 
    </Card>
  );
}
