import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function getServerSideProps() {
  // Here is where (if our env file is missing in our web folder) our code fails. 
  // There is no way to reach our DB link since we cannot access our env file that states where it is.
  const classrooms = await prisma.Classroom.findMany();
  const output = [];
  for (let i=0; i < classrooms.length; i++){
    output[i] = {
      "classroomName": classrooms[i].classroomName,
      "classroomId": classrooms[i].classroomId,
      "description": classrooms[i].description,
      "createdAt": JSON.stringify(classrooms[i].createdAt)
    }
  }
  return {
    props: { classrooms : output }
  };
}

export default function Home( { classrooms }) {

  return (
    <><main>
      <div className={styles.container}>
        <div className='table'>
          {classrooms.map(classrooms => (
            <div key={classrooms.id}>
              <a>
                <h3>{classrooms.classroomName}, created on: {classrooms.createdAt}</h3>
              </a>
            </div>
          ))}
        </div>
      </div>
    </main><footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer></>
  )
}