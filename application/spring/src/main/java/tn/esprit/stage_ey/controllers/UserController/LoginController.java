package tn.esprit.stage_ey.controllers.UserController;


import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import tn.esprit.stage_ey.Entities.AppUser;
import tn.esprit.stage_ey.Entities.ImageModel;
import tn.esprit.stage_ey.Entities.Product;
import tn.esprit.stage_ey.dto.loginRequest;
import tn.esprit.stage_ey.dto.loginResponse;
import tn.esprit.stage_ey.repository.AppUserRepository;
import tn.esprit.stage_ey.repository.ImageModelRepository;
import tn.esprit.stage_ey.repository.ProductRepo;
import tn.esprit.stage_ey.repository.RoleRepository;
import tn.esprit.stage_ey.services.Produit_Categorie.IProduitService;
import tn.esprit.stage_ey.services.UserService.jwt.AppUserService;
import tn.esprit.stage_ey.services.UserService.jwt.loaduser;
import tn.esprit.stage_ey.utilis.JwtUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
public class LoginController {

  private  final AuthenticationManager authenticationManager;
private final AppUserService ser;

  private  final loaduser appUserService;
  private  final JwtUtil jwtUtil;
private final ImageModelRepository imageRepository;
private final AppUserService appUserServic;
private final AppUserRepository appUserRepository;
private final PasswordEncoder passwordEncoder;
private final ProductRepo productRepo;
private final IProduitService productService;

    @PostMapping("/login")
    public ResponseEntity<loginResponse> login(@RequestBody loginRequest loginRequest){

        try {

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
        } catch ( AuthenticationException e) {

            return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        UserDetails userDetails;
        try {

            userDetails= appUserService.loadUserByUsername(loginRequest.getEmail());

        } catch ( UsernameNotFoundException e) {
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        String jwt = jwtUtil.generateToken(userDetails.getUsername());

        return  ResponseEntity.ok(new loginResponse(jwt));



    }
    @GetMapping("/login/role")

    public ResponseEntity<String> getUserRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Get the current user's roles
        List<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        // Convert roles to JSON string
        String rolesJson;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            rolesJson = objectMapper.writeValueAsString(roles);
        } catch (Exception e) {
            // Handle JSON conversion exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error converting roles to JSON");
        }

        // Return roles as JSON object
        return ResponseEntity.ok("{\"roles\": " + rolesJson + "}");

    }
    @PostMapping("/upload-image")
    public ResponseEntity.BodyBuilder uplaodImage(@RequestParam("imageFile") MultipartFile file, Principal connectedUser) throws IOException {

        System.out.println("Original Image Byte Size - " + file.getBytes().length);
        ImageModel img = new ImageModel(file.getOriginalFilename(), file.getContentType(),
                compressBytes(file.getBytes()));
        imageRepository.save(img);
        appUserServic.AffecterImageAuser(img.getId(),appUserServic.getconnecteduser(connectedUser));

        return ResponseEntity.status(HttpStatus.OK);
    }
   /* @PostMapping("/upload-imagep")
    public ResponseEntity.BodyBuilder uplaodImagep(@RequestParam("imageFile") MultipartFile file, @RequestBody Product product) throws IOException {

        System.out.println("Original Image Byte Size - " + file.getBytes().length);
        ImageModel img = new ImageModel(file.getOriginalFilename(), file.getContentType(),
                compressBytes(file.getBytes()));
        imageRepository.save(img);
        product.setImage(img);
        productService.addproduit(product);
        productRepo.save(product);

        return ResponseEntity.status(HttpStatus.OK);
    }*/
    @PostMapping("/upload-imagep/{productId}")
    public ResponseEntity.BodyBuilder uploadImage(@RequestParam("imageFile") MultipartFile file, @PathVariable("productId") Long productId) throws IOException {
        System.out.println("Original Image Byte Size - " + file.getBytes().length);
        ImageModel img = new ImageModel(file.getOriginalFilename(), file.getContentType(), compressBytes(file.getBytes()));
        imageRepository.save(img);
        productService.assignImageToProduct(img.getId(), productId);
        return ResponseEntity.status(HttpStatus.OK);
    }

    @GetMapping(path = { "/getimage/{imageName}" })
    public ImageModel getImage(@PathVariable("imageName") String imageName) throws IOException {

        ImageModel retrievedImage = imageRepository.findByName(imageName);
        ImageModel img = new ImageModel(retrievedImage.getName(), retrievedImage.getType(),
                decompressBytes(retrievedImage.getPicByte()));
        return img;
    }

    @GetMapping("/getimagep/{productId}")
    public ResponseEntity<byte[]> getImagep(@PathVariable("productId") Long productId) {
        // Assuming imageRepository is your repository interface for ImageModel
        Optional<Product> optionalProduct = productRepo.findById(productId);

        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();

            // Assuming product.getImage() retrieves the associated ImageModel
            ImageModel imageModel = product.getImage();

            if (imageModel != null) {
                // Decompress the picByte data if needed (assuming decompressBytes method is defined)
                byte[] picBytes = decompressBytes(imageModel.getPicByte());

                // Set response headers
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.valueOf(imageModel.getType()));
                headers.setContentLength(picBytes.length);
                headers.setContentDispositionFormData("attachment", imageModel.getName());

                return new ResponseEntity<>(picBytes, headers, HttpStatus.OK);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // compress the image bytes before storing it in the database
    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);

        return outputStream.toByteArray();
    }

    // uncompress the image bytes before returning it to the angular application
    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }
    @GetMapping("/getconnecteduser")
    public AppUser findById(Principal connnected){
        String email = connnected.getName();

        // Retrieve the user from the repository based on the email
        Optional<AppUser> optionalUser = appUserRepository.findByEmail(email);
        AppUser user = optionalUser.orElseThrow(() -> new IllegalStateException("User not found"));
        return user;


    }


}
