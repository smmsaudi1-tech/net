import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { RealProject } from '../types';

const PROJECTS_COLLECTION = 'projects';
const CLOUDINARY_CLOUD_NAME = 'vozu2hz0';
const CLOUDINARY_UPLOAD_PRESET = 'unsigned_preset';

// Helper to convert File to compressed Base64 Data URL
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// Fetch all projects live with Firestore onSnapshot subscription
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
        console.warn('Firestore real-time subscription error:', error);
      }
    );
  } catch (err) {
    console.warn('Error subscribing to Firestore projects:', err);
    return () => {};
  }
};

// Upload an image file to Cloudinary (cloudName: vozu2hz0) with Base64 fail-safe fallback
export const uploadProjectImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      const data = await res.json();
      if (data.secure_url) {
        return data.secure_url;
      }
    } else {
      // Try with ml_default preset if unsigned_preset is not configured
      const formData2 = new FormData();
      formData2.append('file', file);
      formData2.append('upload_preset', 'ml_default');

      const res2 = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData2
      });

      if (res2.ok) {
        const data2 = await res2.json();
        if (data2.secure_url) return data2.secure_url;
      }
    }
  } catch (err) {
    console.warn('Cloudinary upload error, using Data URL fallback:', err);
  }

  // Fail-safe fallback if Cloudinary preset is unconfigured in Cloudinary settings
  return await fileToBase64(file);
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
