import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private readonly fireStore: AngularFirestore) { 
    
  }

  // Método para agregar un documento a una colección
  addDocument(collectionPath: string, data: any): Promise<void> {
    const id = this.fireStore.createId();  // Genera un id único para el documento
    return this.fireStore.collection(collectionPath).doc(id).set(data);
  }
}
