import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  onSnapshot,
  orderBy
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { RealProject } from '../types';

const PROJECTS_COLLECTION = 'projects';

// Fetch all projects live with Firestore onSnapshot subscription or getDocs
export const subscribeProjects = (onUpdate: (projects: RealProject[]) => void) => {
  try {
    const q = query(collection(db, PROJECTS_COLLECTION));
    return onSnapshot(
      q,
      (snapshot) => {
        const list: RealProject[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() } as RealProject);
        });
        onUpdate(list);
      },
      (error) => {
        console.warn('Firestore real-time subscription error, fallback used:', error);
      }
    );
  } catch (err) {
    console.warn('Error subscribing to Firestore projects:', err);
    return () => {};
  }
};

// Upload an image file to Firebase Storage and get its downloadable URL
export const uploadProjectImage = async (file: File): Promise<string> => {
  try {
    const storageRef = ref(storage, `projects/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (err) {
    console.error('Error uploading image to Firebase Storage:', err);
    throw err;
  }
};

// Add a new project to Firestore
export const addFirebaseProject = async (project: Omit<RealProject, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
      ...project,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (err) {
    console.error('Error adding project to Firestore:', err);
    throw err;
  }
};

// Update an existing project in Firestore
export const updateFirebaseProject = async (id: string, updates: Partial<RealProject>): Promise<void> => {
  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, id);
    await updateDoc(projectRef, updates);
  } catch (err) {
    console.error('Error updating project in Firestore:', err);
    throw err;
  }
};

// Delete a project from Firestore
export const deleteFirebaseProject = async (id: string): Promise<void> => {
  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, id);
    await deleteDoc(projectRef);
  } catch (err) {
    console.error('Error deleting project from Firestore:', err);
    throw err;
  }
};
