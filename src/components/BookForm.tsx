"use client";

import { Book } from "@/types/book";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Star } from "lucide-react";

interface BookFormProps {
  book?: Book;
  onSubmit: (book: Partial<Book>) => void;
  onCancel: () => void;
}

export default function BookForm({ book, onSubmit, onCancel }: BookFormProps) {
  const [formData, setFormData] = useState<Partial<Book>>(
    book ?? {
      title: "",
      author: "",
      price: 0,
      currency: "AUD",
      isbn: "",
      publicationDate: "",
      genres: [],
      publisher: "",
      description: "",
      coverImage: "",
      pages: 0,
      stock: 0,
      rating: 0,
    }
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </Label>
        <Input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <Label
          htmlFor="author"
          className="block text-sm font-medium text-gray-700"
        >
          Author
        </Label>
        <Input
          type="text"
          id="author"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </Label>
          <Input
            type="number"
            id="price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: parseFloat(e.target.value) })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            step="0.01"
          />
        </div>

        <div>
          <Label
            htmlFor="currency"
            className="block text-sm font-medium text-gray-700"
          >
            Currency
          </Label>
          <Input
            type="text"
            id="currency"
            value={formData.currency}
            onChange={(e) =>
              setFormData({ ...formData, currency: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <Label
          htmlFor="isbn"
          className="block text-sm font-medium text-gray-700"
        >
          ISBN
        </Label>
        <Input
          type="text"
          id="isbn"
          value={formData.isbn}
          onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <Label
          htmlFor="coverImage"
          className="block text-sm font-medium text-gray-700"
        >
          Cover Image URL
        </Label>
        <Input
          type="text"
          id="coverImage"
          value={formData.coverImage}
          onChange={(e) =>
            setFormData({ ...formData, coverImage: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <Label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          required
        />
      </div>

      <div>
        <Label 
          htmlFor="rating"
          className="block text-sm font-medium text-gray-700">
          Rating
        </Label>
        {[1, 2, 3, 4, 5].map((rating) => {
          const shouldBeFilled = !!formData.rating && formData.rating >= rating;
          return (
            <Button
              key={rating}
              type="button"
              variant="ghost"
              onClick={() => setFormData({ ...formData, rating: rating })}
              className={shouldBeFilled ? "text-yellow-500 hover:text-yellow-500" : "text-gray-300 hover:text-yellow-500" }
            >
              <Star size={20} fill={shouldBeFilled ? "currentColor" : "none"} />
            </Button>
          );
        })}
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          onClick={onCancel}
          className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="text-white bg-blue-600 border border-transparent hover:bg-blue-700"
        >
          {book ? "Update Book" : "Add Book"}
        </Button>
      </div>
    </form>
  );
}
