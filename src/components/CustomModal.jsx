import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CustomModal = ({ trigger, title, children, titleStyles }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger className="w-fit">{trigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={titleStyles}>{title}</DialogTitle>
            {/* <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription> */}
            {children}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomModal;
