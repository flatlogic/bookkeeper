import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { withRouter } from 'react-router-dom'

//components
import Widget from '../../../../public/template/components/Widget'
import Code from '../../../../public/template/components/Code'
import Typography from '../../../../common/Typography';
import Button from '../../../../common/Button';

const Pages = props => {
    return (
        <>
            <Grid container spacing={3}>
                <Widget disableWidgetMenu>
                    <Grid item xs={12}>
                            <Typography style={{ marginBottom: 16 }}>
                                Button's variants:
                            </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant={'contained'}
                            style={{ marginRight: 8 }}
                        >
                            contained
                        </Button>
                        <Button variant={'outlined'} style={{ marginRight: 8 }}>
                            outlined
                        </Button>
                        <Button>text</Button>
                        <Typography style={{ marginBottom: 16, marginTop: 16, display: 'block' }}>
                            Code:
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                    <Code row>
                                {`
    <Button variant={"contained"}>contained</Button>
    <Button variant={"outlined"}>outlined</Button>
    <Button>text</Button>
                                `}
                            </Code>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{ marginBottom: 16, marginTop: 16, display: 'block' }}>
                            Button's colors:
                        </Typography>
                        <Box display={'flex'} flexWrap="wrap">
                            <Box mt={2} mr={2}>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                >
                                    default
                                </Button>
                            </Box>
                            <Box mt={2} mr={2}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                >
                                    primary
                                </Button>
                            </Box>
                            <Box mt={2} mr={2}>
                                <Button
                                    color="info"
                                    variant="contained"
                                >
                                    secondary
                                </Button>
                            </Box>
                            <Box mt={2} mr={2}>
                                <Button
                                    color="warning"
                                    variant="contained"
                                >
                                    warning
                                </Button>
                            </Box>
                            <Box mt={2} mr={2}>
                                <Button
                                    color="danger"
                                    variant="contained"
                                >
                                    danger
                                </Button>
                            </Box>
                            <Box mt={2} mr={2}>
                                <Button
                                    color="success"
                                    variant="contained"
                                >
                                    success
                                </Button>
                            </Box>
                            <Box mt={2} mr={2}>
                                <Button variant="contained" color="infoTheme">
                                    info
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid xs={12}>
                        <Typography style={{ marginBottom: 16, marginTop: 16, display: 'block' }}>
                            Code:
                        </Typography>
                        <Code row>
                            {`
    <Button
        color="secondary"
        variant="contained"
    >
        default
    </Button>
    <Button
        color="primary"
        variant="contained"
    >
        primary
    </Button>
    <Button
        color="info"
        variant="contained"
    >
        secondary
    </Button>
    <Button
        color="warning"
        variant="contained"
    >
        warning
    </Button>
    <Button
        color="danger"
        variant="contained"
    >
        danger
    </Button>
    <Button
        color="success"
        variant="contained"
    >
        success
    </Button>
    <Button variant="contained" color="infoTheme">
        info
    </Button>
                                `}
                            </Code>
                    </Grid>
                </Widget>
            </Grid>
        </>
    )
}

export default withRouter(Pages)
