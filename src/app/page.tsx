"use client";

import { useState } from "react";
import data from "../../public/data.json";
import BookCard from "@/components/BookCard";
import BookForm from "@/components/BookForm";
import { Book } from "@/types/book";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";

export default function Page() {
  const [books, setBooks] = useState<Book[]>(data as Book[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);
  const [bookToDelete, setBookToDelete] = useState<Book | undefined>(undefined);

  const handleAddBook = (newBook: Partial<Book>) => {
    const book: Book = {
      ...(newBook as Book),
      id: Math.max(...books.map((b) => b.id)) + 1,
    };
    setBooks([...books, book]);
    setIsModalOpen(false);
  };

  const handleUpdateBook = (updatedBook: Partial<Book>) => {
    setBooks(
      books.map((book) =>
        book.id === selectedBook?.id ? { ...book, ...updatedBook } : book
      )
    );
    setIsModalOpen(false);
    setSelectedBook(undefined);
  };

  const handleDeleteBook = (id: number) => {
    const book = books.find((b) => b.id === id);
    setBookToDelete(book ?? undefined);
  };

  const confirmDeleteBook = () => {
    if (!bookToDelete) return;
    
    setBooks(books.filter((book) => book.id !== bookToDelete.id));
    setBookToDelete(undefined);
  };

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Book Gallery</h1>
        <Button
          onClick={() => {
            setSelectedBook(undefined);
            setIsModalOpen(true);
          }}
        >
          Add New Book
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onEdit={handleEdit}
            onDelete={handleDeleteBook}
          />
        ))}
      </div>

      {/* Add/Edit Book Modal */}
      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) {
            setSelectedBook(undefined);
          }
        }}
      >
        <DialogContent>
          <DialogTitle>{selectedBook ? "Edit Book" : "Add New Book"}</DialogTitle>
          <BookForm
            book={selectedBook}
            onSubmit={selectedBook ? handleUpdateBook : handleAddBook}
            onCancel={() => {
              setIsModalOpen(false);
              setSelectedBook(undefined);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={!!bookToDelete}
        onOpenChange={(open) => {
          if (!open) {
            setBookToDelete(undefined)
          }
        }}
      >
        <DialogContent>
          <DialogTitle>Confirm delete</DialogTitle>
          <DialogDescription>Are you sure you want to delete {bookToDelete?.title}?</DialogDescription>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setBookToDelete(undefined)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeleteBook}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
