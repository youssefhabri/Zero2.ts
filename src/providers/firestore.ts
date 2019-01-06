// Copyright (c) 2017-2018 dirigeants. All rights reserved. MIT license.
import { Provider } from 'klasa';
import firestore from 'firebase-admin';

export default class extends Provider {

  private db: any;

  constructor(...args) {
    // @ts-ignore
    super(...args);
    this.db = undefined;
  }

  async init() {
    await firestore.initializeApp({
      credential: firestore.credential.cert(this.client.options.providers.firestore.credentials),
      databaseURL: this.client.options.providers.firestore.databaseURL,
    });

    this.db = firestore.firestore();
    this.db.settings({ timestampsInSnapshots: true });
  }

  hasTable(table) {
    return this.db.collection(table).get().then(col => Boolean(col.size));
  }

  createTable(table) {
    return this.db.collection(table);
  }

  deleteTable<T = any>(table: string): Promise<T> {
    return undefined;
  }

  getKeys(table) {
    return this.db.collection(table).get().then(snaps => snaps.docs.map(snap => snap.id));
  }

  get(table, id) {
    return this.db.collection(table).doc(id).get().then(snap => this.packData(snap.data(), snap.id));
  }

  has(table, id) {
    return this.db.collection(table).doc(id).get().then(data => data.exists);
  }

  create(table, id, doc = {}) {
    return this.db.collection(table).doc(id).set(this.parseUpdateInput(doc));
  }

  update(table, id, doc) {
    return this.db.collection(table).doc(id).update(this.parseUpdateInput(doc));
  }

  delete(table, id) {
    return this.db.collection(table).doc(id).delete();
  }

  replace(...args) {
    // @ts-ignore
    return this.create(...args);
  }

  async getAll(table, filter = []) {
    const data = await this.db.collection(table).get()
      .then(snaps => snaps.docs.map(snap => this.packData(snap.data(), snap.id)));

    return filter.length ? data.filter(nodes => filter.includes(nodes.id)) : data;
  }

  packData(data, id) {
    return {
      ...data,
      id,
    };
  }

};
