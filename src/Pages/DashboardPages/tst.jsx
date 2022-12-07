import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/core/SvgIcon/SvgIcon";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import React from "react";

<div>
    <Button color="rose" round onClick={() => setModal(true)}>
        Modal
    </Button>
    <Dialog
        classes={{
            root: modalClasses.center,
            paper: modalClasses.modal
        }}
        open={modal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModal(false)}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
    >
        <DialogTitle
            id="classic-modal-slide-title"
            disableTypography
            className={modalClasses.modalHeader}
        >
            <IconButton
                className={modalClasses.modalCloseButton}
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={() => setModal(false)}
            >
                <Close className={modalClasses.modalClose}/>
            </IconButton>
            <h4 className={modalClasses.modalTitle}>Modal title</h4>
        </DialogTitle>
        <DialogContent
            id="modal-slide-description"
            className={modalClasses.modalBody}
        >
            <h5>Are you sure you want to do this?</h5>
        </DialogContent>
        <DialogActions
            className={modalClasses.modalFooter + " " + classes.modalFooterCenter}
        >
            <Button onClick={() => setModal(false)}>Never Mind</Button>
            <Button onClick={() => setModal(false)} color="success">
                Yes
            </Button>
        </DialogActions>
    </Dialog>
</div>