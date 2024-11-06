import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private bdd: Storage | null = null;  // Aquí usamos null al principio
  private bddStatus: Promise<void>;

  // Inicializar el almacenamiento
  constructor(private storage: Storage) {
    this.bddStatus = this.onInit();
  }

  // Método para inicializar el almacenamiento
  private async onInit(): Promise<void> {
    const storageInstance = await this.storage.create();
    this.bdd = storageInstance;  // Asignamos el storage correctamente
  }

  // Verifica si la base de datos está conectada
  private async BDDConectada(): Promise<void> {
    if (!this.bdd) {
      await this.bddStatus;  // Esperamos la inicialización si es necesario
    }
  }

  // Método para obtener un valor de la base de datos
  async get(key: string): Promise<any> {
    await this.BDDConectada();  // Aseguramos que la base de datos esté lista
    return this.bdd?.get(key);  // Si bdd es null, no realiza la operación
  }

  // Método para guardar un valor en la base de datos
  async set(key: string, valor: any): Promise<any> {
    await this.BDDConectada();  // Aseguramos que la base de datos esté lista
    return this.bdd?.set(key, valor);
  }

  // Método para eliminar un valor de la base de datos
  async remove(key: string) {
    await this.BDDConectada();  // Aseguramos que la base de datos esté lista
    this.bdd?.remove(key);
  }
}
