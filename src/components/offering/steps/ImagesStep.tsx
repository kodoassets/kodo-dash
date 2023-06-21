import Button from "@/components/Button";
import PrimaryButton from "@/components/Button/PrimaryButton";
import InteractiveList from "@/components/InteractiveList";
import TextInput from "@/components/TextInput";
import { putCoverImage } from "@/data/mutations/put-cover-image";
import { putGallery } from "@/data/mutations/put-gallery";
import {
  ConfigurationSpecification,
  ConfigurationStepStatus,
  Property,
} from "@/data/queries/get-properties";
import { PropertyByIdQueryKey } from "@/pages/offerings/[id]";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  property: Property;
  specification: ConfigurationSpecification;
  validationResult: ConfigurationStepStatus;
}

const ImagesStep = ({ property, specification, validationResult }: Props) => {
  const [gallery, setGallery] = useState(property.gallery || []);
  const queryClient = useQueryClient();
  const [savingCover, setSavingCover] = useState(false);
  const [savingGallery, setSavingGallery] = useState(false);
  const [coverImage, setCoverImage] = useState(property.cover || "");

  const [galleryInput, setGalleryInput] = useState("");

  const galleryDidntChange =
    gallery.every((i) => property.gallery?.includes(i)) &&
    gallery.length === property.gallery?.length;

  return (
    <div className="">
      <p className="mt-4 mb-2">Cover image</p>
      <TextInput
        label="Link to cover image"
        value={coverImage}
        onChange={setCoverImage}
      />
      <PrimaryButton
        disabled={savingCover || !coverImage || coverImage === property?.cover}
        isLoading={savingCover}
        className="w-full mt-4"
        text="Save"
        onClick={async () => {
          setSavingCover(true);
          try {
            await putCoverImage(property._id, coverImage);
            toast.success("Whitepaper link saved");
            queryClient.invalidateQueries({
              queryKey: [PropertyByIdQueryKey],
            });
          } finally {
            setSavingCover(false);
          }
        }}
      />
      <p className="mt-4 mb-2">Gallery images</p>
      <div className="flex flex-row items-center">
        <TextInput
          className="inline flex-1"
          label="Add image"
          type="text"
          value={galleryInput}
          onChange={setGalleryInput}
        />
        <Button
          className="mt-[28px] px-8"
          onClick={() => {
            if (galleryInput === "" || !galleryInput.includes("https://")) {
              toast.error(
                "Invalid image URL. Must be a valid link starting with https://"
              );
              return;
            }

            if (gallery.includes(galleryInput)) {
              toast.error("Image already added");
              return;
            }

            setGallery([...gallery, galleryInput]);
            setGalleryInput("");
          }}
          text="Add"
        />
      </div>
      <InteractiveList
        onRemoveItem={(item) =>
          setGallery(gallery.filter((i) => i !== item.id))
        }
        items={gallery.map((i) => ({ id: i, text: i }))}
      />
      <PrimaryButton
        disabled={gallery.length < 4 || galleryDidntChange || savingGallery}
        isLoading={savingGallery}
        className="w-full mt-4"
        text="Save"
        onClick={async () => {
          setSavingGallery(true);
          try {
            await putGallery(property._id, gallery);
            toast.success("Gallery saved");
            queryClient.invalidateQueries({
              queryKey: [PropertyByIdQueryKey],
            });
          } finally {
            setSavingGallery(false);
          }
        }}
      />
    </div>
  );
};

export default ImagesStep;
