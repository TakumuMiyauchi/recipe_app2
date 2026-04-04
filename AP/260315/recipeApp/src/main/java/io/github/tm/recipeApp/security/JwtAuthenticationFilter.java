package io.github.tm.recipeApp.security;

import io.github.tm.recipeApp.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public JwtAuthenticationFilter(JwtUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    // 毎回のHTTPリクエストでJWTをチェックして、正しいユーザーなら「ログイン済み」としてSpring Securityに登録する処理
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        //Authorizationヘッダを取得
        String header = request.getHeader("Authorization");

        // Bearerトークンか確認
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            //JWTが有効か確認し、userIdを取得する
            if (jwtUtil.isValid(token)) {
                Long userId = jwtUtil.extractUserId(token);

                userRepository.findById(userId).ifPresent(user -> {
                    LoginUser loginUser = new LoginUser(user.getUserId(),user.getEmail());

                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(
                                    loginUser, //principal
                                    null, //既に認証済みのため不要
                                    List.of(new SimpleGrantedAuthority("ROLE_USER")) //権限情報
                            );
                    // SecurityContext に保存
                    SecurityContextHolder.getContext().setAuthentication(auth);
                });
            }
        }
        // 次のフィルタや最終的なControllerに処理を進める
        filterChain.doFilter(request, response);
    }
}
