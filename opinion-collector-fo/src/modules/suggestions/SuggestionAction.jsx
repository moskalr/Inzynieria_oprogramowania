import { SaveOutlined } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  CardMedia,
  CardContent,
  CardActions,
  TextField
} from '@mui/material';
import { Box } from '@mui/system';
import {
  useEditSuggestion,
  useHandleSuggestion
} from '../../hooks/useSuggestion';
import { useEffect, useState } from 'react';
import { apiGetSuggestion } from '../../api/suggestionApi';
import Card from '@mui/material/Card';
import { useClient } from '../../hooks/useUser';

import Typography from '@mui/material/Typography';

export function SuggestionAction({ suggestionInfo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const { acceptSuggestion, rejectSuggestion } = useHandleSuggestion();
  const editSuggestion = useEditSuggestion();
  const { clientRole } = useClient();

  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleChangeSuggestionStateButton() {
    setIsModalOpen(true);
  }
  const [title, setTitle] = useState(suggestionInfo.suggestionProduct.title);
  const [categoryId, setCategoryId] = useState(
    suggestionInfo.suggestionProduct.categoryId
  );
  const [ean, setEan] = useState(suggestionInfo.suggestionProduct.ean);
  const [origin, setOrigin] = useState(suggestionInfo.suggestionProduct.origin);

  return (
    <Box sx={{ display: 'inline' }}>
      <Button
        sx={{ marginRight: '7px' }}
        onClick={handleChangeSuggestionStateButton}
        variant="outlined"
      >
        Show changes
      </Button>
      <Dialog
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle id="alert-dialog-title">{'Accept changes?'}</DialogTitle>
        <Box
          sx={{
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'stretch',
            gap: 2,
            padding: 2
          }}
        >
          <Card
            variant="outlined"
            sx={{ width: 345, backgroundColor: 'rgb(255,0,0,0.03)' }}
          >
            <CardMedia
              sx={{ height: 140 }}
              image="D:\Repositories\io_2022_01\opinion-collector-fo\src\common\images\monster.jpg"
              title="current product photo"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {suggestionInfo?.product?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Category ID: {suggestionInfo?.product?.categoryId}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Origin: {suggestionInfo?.product?.origin}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                EAN: {suggestionInfo?.product?.ean}
              </Typography>
            </CardContent>
          </Card>
          <Card
            variant="outlined"
            sx={{ width: 345, backgroundColor: 'rgb(0,255,0,0.03)' }}
          >
            <CardMedia
              sx={{ height: 140 }}
              image="D:\Repositories\io_2022_01\opinion-collector-fo\src\common\images\monster.jpg"
              title="Suggested product photo"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Category ID: {categoryId}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Origin: {origin}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                EAN: {ean}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <DialogActions>
        {clientRole == 'STANDARD' && (
          <Button
            onClick={() => {
              setIsModalOpen(false);
              setIsModalEditOpen(true);
              //window.location.reload();
            }}
            size="small"
          >
            Edit
          </Button>
        )}
          
          <Box sx={{ flex: 1 }} />
          {clientRole == 'ADMIN' && (
            <>
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                  rejectSuggestion(suggestionInfo.suggestionId);
                  window.location.reload();
                }}
                size="small"
              >
                Reject
              </Button>
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                  acceptSuggestion(suggestionInfo.suggestionId);
                  window.location.reload();
                }}
                size="small"
                autoFocus
              >
                Accept
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      <Dialog
        open={isModalEditOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle id="alert-dialog-title">{'Edit changes'}</DialogTitle>
        <Box
          sx={{
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'stretch',
            gap: 2,
            padding: 2
          }}
        >
          <Card
            variant="outlined"
            sx={{ width: 345, backgroundColor: 'rgb(255,0,0,0.03)' }}
          >
            <CardMedia
              sx={{ height: 140 }}
              image="D:\Repositories\io_2022_01\opinion-collector-fo\src\common\images\monster.jpg"
              title="current product photo"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {suggestionInfo?.product?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Category ID: {suggestionInfo?.product?.categoryId}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Origin: {suggestionInfo?.product?.origin}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                EAN: {suggestionInfo?.product?.ean}
              </Typography>
            </CardContent>
          </Card>
          <Card
            variant="outlined"
            sx={{ width: 345, backgroundColor: 'rgb(0,255,0,0.03)' }}
          >
            <CardMedia
              sx={{ height: 140 }}
              image="D:\Repositories\io_2022_01\opinion-collector-fo\src\common\images\monster.jpg"
              title="Suggested product photo"
            />
            <CardContent>
              <TextField
                variant="filled"
                margin="none"
                size="small"
                label="Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              ></TextField>
              <TextField
                variant="filled"
                margin="none"
                size="small"
                label="Category ID"
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
              ></TextField>
              <TextField
                variant="filled"
                margin="none"
                size="small"
                label="EAN"
                value={ean}
                onChange={(event) => setEan(event.target.value)}
              ></TextField>
              <TextField
                variant="filled"
                margin="none"
                size="small"
                label="origin"
                value={origin}
                onChange={(event) => setOrigin(event.target.value)}
              ></TextField>
            </CardContent>
          </Card>
        </Box>
        <DialogActions>
          
          <Button
            onClick={() => {
              setIsModalEditOpen(false);
              setIsModalOpen(true);
              suggestionInfo.client = 1;
              const body = JSON.stringify({
                suggestionId: suggestionInfo.suggestionId,
                suggestionProduct: {
                  categoryId: categoryId,
                  ean: ean,
                  image: 'image placeholder',
                  origin: origin,
                  title: title,
                  visibility: true
                }
              });
              editSuggestion(suggestionInfo.suggestionId, body);
            }}
            size="small"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
