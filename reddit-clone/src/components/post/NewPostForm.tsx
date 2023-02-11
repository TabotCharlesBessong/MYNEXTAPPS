import { Flex ,Icon,Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,} from '@chakra-ui/react'
import React, { useState,useRef } from 'react'
import {BiPoll} from 'react-icons/bi'
import { BsLink45Deg, BsMic} from 'react-icons/bs'
import { IoDocumentText,IoImageOutline } from 'react-icons/io5'
import {AiFillCloseCircle} from 'react-icons/ai'
import {TabItem as TabItems,TextInputs,ImageUpload} from '../index'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { firestore, storage } from "../../firebase/clientApp";
import {useSetRecoilState} from 'recoil'
import { useRouter } from "next/router";
import { postState } from "../../atoms/postsAtom";
import { getDownloadURL, ref, uploadString } from "firebase/storage";



const formTabs: TabItem[] = [
  {
    title:'Post',
    icon:IoDocumentText
  },
  {
    title:'Images and Video',
    icon:IoImageOutline
  },
  {
    title:'Link',
    icon:BsLink45Deg
  },
  {
    title:'Poll',
    icon:BiPoll
  },
  {
    title:'Talk',
    icon:BsMic
  }

]

// this is the type of the type item we are going to have
export type TabItem = {
  title:string,
  icon: typeof Icon.arguments
}

type NewPostFormProps = {
  communityId: string;
  communityImageURL?: string;
  user: User;
};

const NewPostForm:React.FC<NewPostFormProps> = ({
  communityId,
  communityImageURL,
  user
}) => {
  const [selectedTab,setSelectedTab] = useState(formTabs[0])
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const [selectedFile, setSelectedFile] = useState<string>();
  const selectFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const setPostItems = useSetRecoilState(postState);

  const handleCreatePost = async () => {
    setLoading(true);
    const { title, body } = textInputs;
    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), {
        communityId,
        communityImageURL: communityImageURL || "",
        creatorId: user.uid,
        userDisplayText: user.email!.split("@")[0],
        title,
        body,
        numberOfComments: 0,
        voteStatus: 0,
        createdAt: serverTimestamp(),
        editedAt: serverTimestamp(),
      });

      console.log("HERE IS NEW POST ID", postDocRef.id);

      // // check if selectedFile exists, if it does, do image processing
      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
        console.log("HERE IS DOWNLOAD URL", downloadURL);
      }

      // Clear the cache to cause a refetch of the posts
      setPostItems((prev) => ({
        ...prev,
        postUpdateRequired: true,
      }));
      router.back();
    } catch (error) {
      console.log("createPost error", error);
      setError("Error creating post");
    }
    setLoading(false);
  };

  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target?.result as string);
      }
    };
  };

  const onTextChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  return (
    <Flex direction='column' bg='white' borderRadius={4} mb={2} >
      <Flex width='100%' >
        {formTabs.map((item) => (
          <TabItems key={item.title} item={item} selected={item.title.toString() === selectedTab.toString()} setSelectedTab={setSelectedTab} />
        ))}
      </Flex>
      <Flex p={4}>
        {selectedTab.toString() === "Post" && (
          <TextInputs
            textInputs={textInputs}
            onChange={onTextChange}
            handleCreatePost={handleCreatePost}
            loading={loading}
          />
        )}
        {selectedTab.toString() === "Images and Video" && (
          <ImageUpload
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            setSelectedTab={setSelectedTab}
            selectFileRef={selectFileRef}
            onSelectImage={onSelectImage}
          />
        )}
      </Flex>

      {error && (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>{error}</AlertTitle>
          <AlertDescription>Please check the values you have added and try again or check network</AlertDescription>
        </Alert>
      )}
    </Flex>
  )
}

export default NewPostForm 