import { Injectable } from '@angular/core';

export interface Person {
  firstName?: string;
  familyName?: string;
  age?: number;
  address: {
    city?: string;
    street?: string;
    postCode?: string;
  };
}

const STORAGE_KEY = 'persons';

@Injectable({ providedIn: 'root' })
export class PersonService {
  private readAllInternal(): Person[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    try {
      const parsed = JSON.parse(raw) as Person[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private writeAllInternal(persons: Person[]): void {
    if (typeof localStorage === 'undefined') {
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persons));
  }

  getAll(): Person[] {
    return this.readAllInternal();
  }

  getByIndex(index: number): Person | null {
    const persons = this.readAllInternal();
    if (index < 0 || index >= persons.length) {
      return null;7
    }
    return persons[index];
  }

  add(person: Person): void {
    const persons = this.readAllInternal();
    persons.push(person);
    this.writeAllInternal(persons);
  }

  delete(index: number): void {
    const persons = this.readAllInternal();
    if (index < 0 || index >= persons.length) {
      return;
    }
    persons.splice(index, 1);
    this.writeAllInternal(persons);
  }
}

